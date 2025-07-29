// app/api/careers/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Applicant from '@/app/models/Applicant'; // Using your centralized model
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// Helper to get JWT secret
const getJwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

// MongoDB connection
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'teamworks',
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
}

// GET handler - Fetch applicants, excluding soft-deleted ones
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url); // Variable is defined here as "searchParams"
    const jobId = searchParams.get('jobId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    // THE FIX: Use the correct variable name "searchParams"
    const limit = parseInt(searchParams.get('limit') || '10', 10); 
    
    const sort = searchParams.get('sort') || '-submittedAt';
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : null;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : null;
    const skip = (page - 1) * limit;

    // Build query to always exclude soft-deleted records
    let query = { isDeleted: false }; 
    if (jobId) {
        query.jobId = jobId;
    }
    
    if (startDate && !isNaN(startDate)) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      query.submittedAt = { ...query.submittedAt, $gte: start };
    }
    if (endDate && !isNaN(endDate)) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.submittedAt = { ...query.submittedAt, $lte: end };
    }

    const [applicants, total] = await Promise.all([
      Applicant.find(query)
        .select('name age experience resumeUrl jobId submittedAt')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Applicant.countDocuments(query),
    ]);

    const response = {
      applicants,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalApplicants: total,
        limit,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applicants: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE handler - Soft-deletes a specific applicant by ID
export async function DELETE(request) {
    try {
        // Authorization check
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get('token');
        if (!tokenCookie) {
            return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
        }
        const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
        if (payload.role === 'Employee') {
            return NextResponse.json({ error: 'Forbidden: Insufficient permissions.' }, { status: 403 });
        }

        await connectToDatabase();
        
        // Get the ID from the request body
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'Applicant ID is required.' }, { status: 400 });
        }

        const deletedApplicant = await Applicant.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        if (!deletedApplicant) {
            return NextResponse.json({ error: 'Applicant not found.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Applicant successfully deleted.' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting applicant:', error);
        return NextResponse.json({ error: 'Failed to delete applicant.' }, { status: 500 });
    }
}
