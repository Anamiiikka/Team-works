// app/api/auth/reset-password/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, { dbName: 'teamworks' });
}

export async function POST(request) {
  await connectToDatabase();

  const token = request.cookies.get('token')?.value; // fetch 'token' cookie

  if (!token) {
    return NextResponse.json(
      { message: 'Authentication token missing. Login required.' },
      { status: 401 }
    );
  }

  // Verify JWT token
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json(
      { message: 'Invalid or expired token. Please login again.' },
      { status: 401 }
    );
  }

  const { newPassword } = await request.json();

  if (!newPassword) {
    return NextResponse.json(
      { message: 'New password is required.' },
      { status: 400 }
    );
  }

  try {
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Set new password (ensure your User model has pre-save hook for hashing)
    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      { message: 'Password updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json(
      { message: 'Server error while resetting password.' },
      { status: 500 }
    );
  }
}
