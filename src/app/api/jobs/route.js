import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/app/models/Job';
import User from '@/app/models/User';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// Helper function to get the JWT secret
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  return new TextEncoder().encode(secret);
};

// Helper to verify token and return payload
async function verifyAuthAndGetPayload() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        throw { code: 401, message: 'Authentication token not found.' };
    }
    try {
        const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
        return payload;
    } catch (err) {
        if (err.code === 'ERR_JWT_EXPIRED') {
            throw { code: 401, message: 'Session expired. Please log in again.' };
        }
        throw { code: 401, message: 'Invalid authentication token.' };
    }
}

// GET - Fetch jobs with pagination and filtering
export async function GET(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    // Only Admin and SuperAdmin can manage jobs
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || '-postedDate';
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const isActive = searchParams.get('isActive');

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { jobId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) {
      query.department = department;
    }

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      query.isActive = isActive === 'true';
    }

    const jobs = await Job.find(query)
      .populate('createdBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Get departments for filter
    const departments = await Job.distinct('department');

    return NextResponse.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      departments
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    // Only Admin and SuperAdmin can create jobs
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    const {
      jobId,
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements,
      responsibilities,
      isActive
    } = body;

    // Validation
    if (!jobId || !title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: 'Missing required fields (jobId, title, department, location, type, experience, description)' },
        { status: 400 }
      );
    }

    // Check if jobId already exists
    const existingJob = await Job.findOne({ jobId });
    if (existingJob) {
      return NextResponse.json(
        { error: 'Job ID already exists. Please use a unique Job ID.' },
        { status: 400 }
      );
    }

    if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
      return NextResponse.json(
        { error: 'At least one requirement is needed' },
        { status: 400 }
      );
    }

    if (!responsibilities || !Array.isArray(responsibilities) || responsibilities.length === 0) {
      return NextResponse.json(
        { error: 'At least one responsibility is needed' },
        { status: 400 }
      );
    }

    const newJob = new Job({
      jobId,
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements: requirements.filter(req => req.trim()),
      responsibilities: responsibilities.filter(resp => resp.trim()),
      isActive: isActive !== undefined ? isActive : true,
      createdBy: payload.userId
    });

    await newJob.save();
    await newJob.populate('createdBy', 'name email');

    return NextResponse.json({
      message: 'Job created successfully',
      job: newJob
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000 || error.codeName === 'DuplicateKey') {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'jobId') {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// PUT - Update job
export async function PUT(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    // Only Admin and SuperAdmin can update jobs
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    const {
      id,
      jobId,
      title,
      department,
      location,
      type,
      experience,
      description,
      requirements,
      responsibilities,
      isActive
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if jobId is being updated and if it conflicts with existing jobs
    if (jobId && jobId !== job.jobId) {
      const existingJob = await Job.findOne({ jobId });
      if (existingJob) {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }

    // Update job
    job.jobId = jobId || job.jobId;
    job.title = title || job.title;
    job.department = department || job.department;
    job.location = location || job.location;
    job.type = type || job.type;
    job.experience = experience || job.experience;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.responsibilities = responsibilities || job.responsibilities;
    job.isActive = isActive !== undefined ? isActive : job.isActive;

    await job.save();
    await job.populate('createdBy', 'name email');

    return NextResponse.json({
      message: 'Job updated successfully',
      job
    });

  } catch (error) {
    console.error('Error updating job:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000 || error.codeName === 'DuplicateKey') {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'jobId') {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    // Only Admin and SuperAdmin can delete jobs
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    await Job.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
