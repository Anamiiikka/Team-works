// app/api/cms/users/[id]/route.js
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

// PUT handler - To update a user's role (no changes here)
export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
      return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
    }

    const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
    const requestorRole = payload.role;

    if (requestorRole !== 'Admin' && requestorRole !== 'SuperAdmin') {
      return NextResponse.json({ message: 'Forbidden. Insufficient permissions.' }, { status: 403 });
    }

    const { id } = params;
    const { role: newRole } = await request.json();

    if (!['SuperAdmin', 'Admin', 'Employee'].includes(newRole)) {
      return NextResponse.json({ message: 'Invalid role specified.' }, { status: 400 });
    }

    if (requestorRole === 'Admin' && newRole === 'SuperAdmin') {
      return NextResponse.json({ message: 'Forbidden: Admins cannot assign the SuperAdmin role.' }, { status: 403 });
    }

    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: newRole, isVerified: true },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ message: 'Server error while updating user.' }, { status: 500 });
  }
}

// DELETE handler - To permanently remove a user (UPDATED)
export async function DELETE(request, { params }) {
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
            return NextResponse.json({ message: 'Forbidden: Insufficient permissions.' }, { status: 403 });
        }
        
        const { id: userIdToDelete } = params;
        
        // 2. Prevent users from deleting themselves
        if (requestorId === userIdToDelete) {
            return NextResponse.json({ message: 'You cannot delete your own account.' }, { status: 400 });
        }

        await connectToDatabase();
        const userToDelete = await User.findById(userIdToDelete);

        if (!userToDelete) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }
        
        // 3. Admins cannot delete SuperAdmins
        if (requestorRole === 'Admin' && userToDelete.role === 'SuperAdmin') {
            return NextResponse.json({ message: 'Forbidden: Admins cannot delete SuperAdmin accounts.' }, { status: 403 });
        }
        
        // 4. NEW RULE: An Admin cannot delete another Admin
        if (requestorRole === 'Admin' && userToDelete.role === 'Admin') {
            return NextResponse.json({ message: 'Forbidden: Admins cannot delete other Admins.' }, { status: 403 });
        }
        
        // 5. Proceed with deletion
        await User.findByIdAndDelete(userIdToDelete);

        return NextResponse.json({ message: 'User successfully deleted.' }, { status: 200 });

    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ message: 'Server error while deleting user.' }, { status: 500 });
    }
}
