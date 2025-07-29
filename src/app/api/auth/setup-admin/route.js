// app/api/auth/setup-admin/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/models/User';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, { dbName: 'teamworks' });
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Name, email and password are required.' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update existing user to be SuperAdmin and verified
      existingUser.role = 'SuperAdmin';
      existingUser.isVerified = true;
      if (name) existingUser.name = name;
      await existingUser.save();
      
      return NextResponse.json({
        message: 'User updated to SuperAdmin successfully!',
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          isVerified: existingUser.isVerified
        }
      }, { status: 200 });
    }

    // Create new SuperAdmin user
    const user = new User({
      name,
      email,
      password,
      role: 'SuperAdmin',
      isVerified: true
    });

    await user.save();

    return NextResponse.json({
      message: 'SuperAdmin user created successfully!',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Setup Admin Error:', error);
    return NextResponse.json({ message: 'Server error during admin setup.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all users to debug
    const users = await User.find({}).select('name email role isVerified createdAt');
    
    return NextResponse.json({
      message: 'Current users in database:',
      users
    }, { status: 200 });

  } catch (error) {
    console.error('Get Users Error:', error);
    return NextResponse.json({ message: 'Server error getting users.' }, { status: 500 });
  }
}
