// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // To log the user out, we clear the 'token' cookie by setting its
    // expiration date to a time in the past.
    cookies().set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0), // Set expiry date to the past
      path: '/',
    });

    return NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json({ message: 'Server error during logout.' }, { status: 500 });
  }
}
