// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/models/User'; // Adjust path if needed

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, { dbName: 'teamworks' });
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await request.json();

    // ✅ Validate all fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 409 }
      );
    }

    // ✅ Fix: Store the name field as required by schema
    await User.create({ name, email, password });

    return NextResponse.json(
      {
        message: 'Signup successful! Please wait for an administrator to verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { message: 'Server error during signup.', error: error.message },
      { status: 500 }
    );
  }
}
