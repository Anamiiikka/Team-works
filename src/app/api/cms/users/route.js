// app/api/cms/users/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User'; // Adjusted path to be consistent
import { connectToDatabase } from '@/lib/mongodb';
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


// GET handler - To fetch all users (existing code)
export async function GET(request) {
  try {
    const payload = await verifyAuthAndGetPayload();
    
    if (payload.role !== 'Admin' && payload.role !== 'SuperAdmin') {
      return NextResponse.json({ message: 'Forbidden: You do not have sufficient permissions.' }, { status: 403 });
    }

    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: error.message || 'An internal server error occurred.' },
      { status: error.code || 500 }
    );
  }
}

// POST handler - To create a new user from the admin dashboard
export async function POST(request) {
    try {
        const requestorPayload = await verifyAuthAndGetPayload();

        // 1. Authorization check: Only Admins/SuperAdmins can create users
        if (requestorPayload.role !== 'Admin' && requestorPayload.role !== 'SuperAdmin') {
            return NextResponse.json({ message: 'Forbidden: You do not have permission to create users.' }, { status: 403 });
        }

        // 2. Get new user data from request body
        const { name, email, password, role } = await request.json();
        if (!name || !email || !password || !role) {
            return NextResponse.json({ message: 'Name, email, password, and role are required.' }, { status: 400 });
        }

        // 3. Security Rule: An Admin cannot create a SuperAdmin
        if (requestorPayload.role === 'Admin' && role === 'SuperAdmin') {
            return NextResponse.json({ message: 'Forbidden: Admins cannot create SuperAdmin users.' }, { status: 403 });
        }
        
        await connectToDatabase();

        // 4. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: 'A user with this email already exists.' }, { status: 409 });
        }

        // 5. Create the new user, already verified
        const newUser = await User.create({
            name,
            email,
            password,
            role,
            isVerified: true, // User is automatically verified when created by an admin
        });

        // Exclude password from the response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return NextResponse.json(userResponse, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { message: error.message || 'An internal server error occurred while creating the user.' },
            { status: error.code || 500 }
        );
    }
}
