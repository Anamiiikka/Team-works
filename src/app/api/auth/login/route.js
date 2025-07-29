// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, { dbName: 'teamworks' });
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // IMPORTANT: Check if the user is verified
    if (!user.isVerified || !user.role) {
      return NextResponse.json(
        { message: 'Account not verified. Please contact an administrator.' },
        { status: 403 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set token in an HttpOnly cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json(
      {
        message: 'Login successful!',
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Server error during login.' }, { status: 500 });
  }
}
