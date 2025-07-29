// app/api/uploads/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import cloudinary from '@/lib/cloudinary';
import Upload from '@/app/models/Upload';
import User from '@/app/models/User';

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

// POST handler - Upload file (SuperAdmin and Admin only)
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    
    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    
    if (!['SuperAdmin', 'Admin'].includes(payload.role)) {
        return NextResponse.json({ error: 'Forbidden: Only SuperAdmin and Admin can upload files.' }, { status: 403 });
    }

    await connectToDatabase();

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const visibilityLevel = formData.get('visibilityLevel');

    // Validate input
    if (!file || !title || !visibilityLevel) {
      return NextResponse.json(
        { error: 'File, title, and visibility level are required' },
        { status: 400 }
      );
    }

    // Validate visibility level
    const validVisibilityLevels = ['SuperAdmin', 'Admin', 'Employee', 'Public'];
    if (!validVisibilityLevels.includes(visibilityLevel)) {
      return NextResponse.json(
        { error: 'Invalid visibility level' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Upload file to Cloudinary
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'teamworks_uploads',
          public_id: `${Date.now()}_${file.name}`,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(fileBuffer);
    });

    // Save upload data
    const upload = new Upload({
      title,
      description: description || '',
      fileName: file.name,
      fileUrl: uploadResult.secure_url,
      fileType: file.type,
      fileSize: file.size,
      visibilityLevel,
      uploadedBy: payload.userId,
      uploadedAt: new Date(),
    });

    await upload.save();
    
    // Populate the uploadedBy field before returning
    await upload.populate('uploadedBy', 'name email');

    return NextResponse.json(
      { message: 'File uploaded successfully', upload },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file: ' + error.message },
      { status: 500 }
    );
  }
}

// GET handler - Get uploads based on user role
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    
    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') || '-uploadedAt';
    const skip = (page - 1) * limit;

    // Build query based on user role
    let query = { isDeleted: false };
    
    const roleHierarchy = {
      'SuperAdmin': ['SuperAdmin', 'Admin', 'Employee', 'Public'],
      'Admin': ['Admin', 'Employee', 'Public'],
      'Employee': ['Employee', 'Public']
    };

    const allowedVisibilityLevels = roleHierarchy[payload.role] || ['Public'];
    query.visibilityLevel = { $in: allowedVisibilityLevels };

    const [uploads, total] = await Promise.all([
      Upload.find(query)
        .populate('uploadedBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Upload.countDocuments(query),
    ]);

    return NextResponse.json({
      uploads,
      pagination: { 
        currentPage: page, 
        totalPages: Math.ceil(total / limit), 
        totalUploads: total, 
        limit 
      },
    });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploads: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete upload (SuperAdmin and Admin only)
export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    
    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    
    if (!['SuperAdmin', 'Admin'].includes(payload.role)) {
        return NextResponse.json({ error: 'Forbidden: Only SuperAdmin and Admin can delete files.' }, { status: 403 });
    }

    await connectToDatabase();
    
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Upload ID is required' }, { status: 400 });
    }

    const upload = await Upload.findById(id);
    if (!upload) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    upload.isDeleted = true;
    await upload.save();

    return NextResponse.json({ message: 'Upload marked as deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting upload:', error);
    return NextResponse.json(
      { error: 'Failed to delete upload: ' + error.message },
      { status: 500 }
    );
  }
}
