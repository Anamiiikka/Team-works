// app/api/auth/forgot-password/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    console.log('Forgot password API called'); // Debug log
    
    await connectToDatabase();
    const { email } = await request.json();

    console.log('Email received:', email); // Debug log

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No'); // Debug log

    if (!user) {
      return NextResponse.json({ 
        message: 'If an account with this email exists, instructions have been sent.' 
      }, { status: 200 });
    }

    // Generate role-based message
    let message = '';
    let contactInfo = '';

    switch (user.role) {
      case 'SuperAdmin':
        message = `Dear ${user.name},\n\nAs a SuperAdmin, please contact the AdaLabs team directly for password reset assistance.\n\nContact Information:\n📧 Email: support@adalabs.com\n📞 Phone: +1-xxx-xxx-xxxx\n\nThank you!`;
        contactInfo = 'Contact AdaLabs team for assistance';
        break;
        
      case 'Admin':
        message = `Dear ${user.name},\n\nAs an Admin, please contact your SuperAdmin for password reset assistance.\n\nAlternatively, you can contact the AdaLabs team:\n📧 Email: support@adalabs.com\n\nYour password reset request has been logged in the system.\n\nThank you!`;
        contactInfo = 'Contact SuperAdmin or AdaLabs team';
        break;
        
      case 'Employee':
        message = `Dear ${user.name},\n\nAs an Employee, please contact your Admin or SuperAdmin for password reset assistance.\n\nYour password reset request has been logged in the system and relevant administrators have been notified.\n\nThank you!`;
        contactInfo = 'Contact Admin or SuperAdmin';
        break;
        
      default:
        message = `Dear ${user.name},\n\nYour account role is not properly configured. Please contact the AdaLabs team for assistance.\n\n📧 Email: support@adalabs.com\n\nThank you!`;
        contactInfo = 'Contact AdaLabs team - role not configured';
    }

    // Update user with forgot password request
    await User.findByIdAndUpdate(user._id, {
      forgotPasswordRequest: {
        isActive: true,
        requestedAt: new Date(),
        message: contactInfo
      }
    });

    console.log('User updated successfully'); // Debug log

    return NextResponse.json({ 
      message: message
    }, { status: 200 });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ 
      message: 'Server error during forgot password request.' 
    }, { status: 500 });
  }
}
