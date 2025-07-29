// app/api/leads/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Lead from '@/app/models/Lead'; // Import the centralized model

// Helper function to get the JWT secret from environment variables
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set in environment variables.');
    }
    return new TextEncoder().encode(secret);
};

// MongoDB connection
let isConnected = false;

async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'teamworks',
    });
    isConnected = true;
    console.log('MongoDB connected successfully at', new Date().toISOString());
  } catch (error) {
    console.error('MongoDB connection error at', new Date().toISOString(), error);
    throw new Error('Database connection failed');
  }
}

// POST handler - Remains public for lead submissions
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, industry, message, requestFrom, isSubscribed } = body;
    const submittedAt = new Date();

    if (!name || !email || !industry || !message || !requestFrom) {
      return NextResponse.json({ data: {}, error: 'All required fields must be filled' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ data: {}, error: 'Invalid email format' }, { status: 400 });
    }

    const lead = new Lead({ ...body, submittedAt });
    const response = await lead.save();
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json({ error: 'Failed to process lead: ' + error.message }, { status: 500 });
  }
}

// GET handler - Secured for authenticated users only
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    await jwtVerify(tokenCookie.value, getJwtSecret());

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') || '-submittedAt';
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : null;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : null;
    const skip = (page - 1) * limit;

    let query = { isDeleted: false };
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

    const [leads, total] = await Promise.all([
      Lead.find(query).select('name email industry message requestFrom submittedAt _id').sort(sort).skip(skip).limit(limit).lean(),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({
      leads,
      pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalLeads: total, limit },
    });
  } catch (error) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
    }
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads: ' + error.message }, { status: 500 });
  }
}

// DELETE handler - Secured with role-based check
export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    
    if (payload.role === 'Employee') {
        return NextResponse.json({ error: 'Forbidden: You do not have permission to delete leads.' }, { status: 403 });
    }

    await connectToDatabase();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }
    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }
    lead.isDeleted = true;
    await lead.save();
    return NextResponse.json({ message: 'Lead marked as deleted' }, { status: 200 });
  } catch (error) {
    if (error.code === 'ERR_JWT_EXPIRED') {
      return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
    }
    console.error('Error marking lead as deleted:', error);
    return NextResponse.json({ error: 'Failed to mark lead as deleted: ' + error.message }, { status: 500 });
  }
}
