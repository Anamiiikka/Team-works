import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
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

    console.log('Fetched jobs:', jobs.map(job => ({ _id: job._id, jobId: job.jobId })));

    const total = await Job.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

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
      { error: 'Failed to fetch jobs: ' + error.message },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    console.log('POST request body:', body);
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
    if (!jobId || !jobId.trim()) {
      return NextResponse.json(
        { error: 'Job ID is required and cannot be empty' },
        { status: 400 }
      );
    }
    if (jobId.length > 20) {
      return NextResponse.json(
        { error: 'Job ID cannot exceed 20 characters' },
        { status: 400 }
      );
    }
    if (!title || !department || !location || !type || !experience || !description) {
      return NextResponse.json(
        { error: 'Missing required fields (title, department, location, type, experience, description)' },
        { status: 400 }
      );
    }

    if (!requirements || !Array.isArray(requirements) || requirements.filter(req => req.trim()).length === 0) {
      return NextResponse.json(
        { error: 'At least one non-empty requirement is needed' },
        { status: 400 }
      );
    }

    if (!responsibilities || !Array.isArray(responsibilities) || responsibilities.filter(resp => resp.trim()).length === 0) {
      return NextResponse.json(
        { error: 'At least one non-empty responsibility is needed' },
        { status: 400 }
      );
    }

    // Check if jobId already exists
    const existingJob = await Job.findOne({ jobId: jobId.trim() });
    if (existingJob) {
      return NextResponse.json(
        { error: 'Job ID already exists. Please use a unique Job ID.' },
        { status: 400 }
      );
    }

    // Create new job document
    const jobData = {
      jobId: jobId.trim(),
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type,
      experience: experience.trim(),
      description: description.trim(),
      requirements: requirements.filter(req => req.trim()),
      responsibilities: responsibilities.filter(resp => resp.trim()),
      isActive: isActive !== undefined ? isActive : true,
      createdBy: new mongoose.Types.ObjectId(payload.userId),
      postedDate: new Date(),
      updatedAt: new Date()
    };

    console.log('Job data for creation:', jobData);

    // Use create instead of new/save to bypass potential schema issues
    const savedJob = await Job.create(jobData);
    console.log('Saved job before populate:', savedJob);
    await savedJob.populate('createdBy', 'name email');
    console.log('Saved job after populate:', savedJob);

    return NextResponse.json({
      message: 'Job created successfully',
      job: savedJob
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    
    if (error.code === 11000 || error.codeName === 'DuplicateKey') {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'jobId') {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create job: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT - Update job
export async function PUT(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    console.log('PUT request body:', body);
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
        { error: 'Job ID (_id) is required' },
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

    if (jobId && jobId.trim() !== job.jobId) {
      if (jobId.length > 20) {
        return NextResponse.json(
          { error: 'Job ID cannot exceed 20 characters' },
          { status: 400 }
        );
      }
      const existingJob = await Job.findOne({ jobId: jobId.trim() });
      if (existingJob && existingJob._id.toString() !== id) {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }

    // Update fields
    job.jobId = jobId ? jobId.trim() : job.jobId;
    job.title = title ? title.trim() : job.title;
    job.department = department ? department.trim() : job.department;
    job.location = location ? location.trim() : job.location;
    job.type = type || job.type;
    job.experience = experience ? experience.trim() : job.experience;
    job.description = description ? description.trim() : job.description;
    job.requirements = requirements && Array.isArray(requirements) ? requirements.filter(req => req.trim()) : job.requirements;
    job.responsibilities = responsibilities && Array.isArray(responsibilities) ? responsibilities.filter(resp => resp.trim()) : job.responsibilities;
    job.isActive = isActive !== undefined ? isActive : job.isActive;
    job.updatedAt = new Date();

    console.log('Job before update:', job);
    const updatedJob = await job.save();
    console.log('Updated job before populate:', updatedJob);
    await updatedJob.populate('createdBy', 'name email');
    console.log('Updated job after populate:', updatedJob);

    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob
    });

  } catch (error) {
    console.error('Error updating job:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    
    if (error.code === 11000 || error.codeName === 'DuplicateKey') {
      const field = Object.keys(error.keyPattern || {})[0];
      if (field === 'jobId') {
        return NextResponse.json(
          { error: 'Job ID already exists. Please use a unique Job ID.' },
          { status: 400 }
        );
      }
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update job: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
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
      { error: 'Failed to delete job: ' + error.message },
      { status: 500 }
    );
  }
}