// app/api/cms/users/[id]/password/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  return new TextEncoder().encode(secret);
};

// PUT handler - To update a user's password
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    const requestorRole = payload.role;
    const requestorId = payload.userId;

    // 1. Authorization check
    if (requestorRole !== 'Admin' && requestorRole !== 'SuperAdmin') {
      return NextResponse.json({ message: 'Forbidden. Insufficient permissions.' }, { status: 403 });
    }

    const { id: targetUserId } = await params;
    const { password: newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    await connectToDatabase();
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // 2. Permission checks based on roles
    if (requestorRole === 'SuperAdmin') {
      // SuperAdmin can change anyone's password
    } else if (requestorRole === 'Admin') {
      // Admin can only change Employee passwords
      if (targetUser.role !== 'Employee') {
        return NextResponse.json({ 
          message: 'Forbidden: Admins can only change Employee passwords.' 
        }, { status: 403 });
      }
    }

    // 3. Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 4. Update the user's password AND clear forgot password request
    await User.findByIdAndUpdate(targetUserId, { 
      password: hashedPassword,
      // Clear the forgot password request when password is reset
      $unset: { forgotPasswordRequest: 1 }
    });

    return NextResponse.json({ 
      message: 'Password updated successfully.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to update password:', error);
    return NextResponse.json({ 
      message: 'Server error while updating password.' 
    }, { status: 500 });
  }
}
