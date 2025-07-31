// app/api/jobs/portal-toggle/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/app/models/Job';
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

// PUT - Toggle portal listing for all jobs
export async function PUT(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    if (!['Admin', 'SuperAdmin'].includes(payload.role)) {
      return NextResponse.json({ error: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { action } = body; // 'list' or 'delist'

    if (!action || !['list', 'delist'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "list" or "delist".' },
        { status: 400 }
      );
    }

    const isListedOnPortal = action === 'list';

    // Update all jobs' portal listing status
    const result = await Job.updateMany(
      {}, // Update all jobs
      { 
        $set: { 
          isListedOnPortal: isListedOnPortal,
          updatedAt: new Date()
        }
      }
    );

    const actionText = action === 'list' ? 'listed on' : 'delisted from';
    
    return NextResponse.json({
      message: `All jobs have been ${actionText} the portal successfully.`,
      updatedCount: result.modifiedCount,
      action: action
    });

  } catch (error) {
    console.error('Error toggling portal listing:', error);
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json({ error: error.message }, { status: error.code });
    }
    return NextResponse.json(
      { error: 'Failed to toggle portal listing: ' + error.message },
      { status: 500 }
    );
  }
}
