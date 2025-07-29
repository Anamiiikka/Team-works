// app/api/cms/stats/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// Import all necessary models directly
import Lead from '@/app/models/Lead';
import Applicant from '@/app/models/Applicant';
import User from '@/app/models/User';

// Helper to verify auth
async function verifyAuth() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) throw new Error('Authentication required.');
    await jwtVerify(tokenCookie.value, new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function GET(request) {
    try {
        await verifyAuth();
        await connectToDatabase();

        // Use the imported models directly. They are now guaranteed to be available.
        const [leadCount, applicantCount, userCount] = await Promise.all([
            Lead.countDocuments({ isDeleted: false }),
            Applicant.countDocuments({ isDeleted: false }), // THE FIX: Only count non-deleted applicants
            User.countDocuments({ isVerified: true })
        ]);

        return NextResponse.json({
            leads: leadCount,
            careers: applicantCount, // Sending applicant count as 'careers' key for the dashboard
            users: userCount
        }, { status: 200 });

    } catch (error) {
        if (error.message.includes('Authentication')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        console.error('Failed to fetch stats:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard stats: ' + error.message }, { status: 500 });
    }
}
