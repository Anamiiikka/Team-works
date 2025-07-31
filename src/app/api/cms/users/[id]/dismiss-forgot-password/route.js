// app/api/cms/users/[id]/dismiss-forgot-password/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  return new TextEncoder().encode(secret);
};

// PUT handler - To dismiss forgot password request
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    const requestorRole = payload.role;

    // Only Admins and SuperAdmins can dismiss forgot password requests
    if (requestorRole !== 'Admin' && requestorRole !== 'SuperAdmin') {
      return NextResponse.json({ message: 'Forbidden. Insufficient permissions.' }, { status: 403 });
    }

    const { id: userId } = await params;

    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { forgotPasswordRequest: 1 }
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Forgot password request dismissed successfully.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to dismiss forgot password request:', error);
    return NextResponse.json({ 
      message: 'Server error while dismissing forgot password request.' 
    }, { status: 500 });
  }
}
