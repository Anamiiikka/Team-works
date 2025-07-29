// app/api/public/jobs/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Job from '@/app/models/Job';

// GET - Fetch active jobs for public display
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department') || '';
    const search = searchParams.get('search') || '';

    // Build query - only show active jobs
    let query = { isActive: true };
    
    if (search) {
      query.$or = [
        { jobId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) {
      query.department = department;
    }

    const jobs = await Job.find(query)
      .select('jobId title department location type experience description requirements responsibilities postedDate')
      .sort({ postedDate: -1 });

    // Get departments for filter
    const departments = await Job.distinct('department', { isActive: true });

    return NextResponse.json({
      jobs,
      departments
    });

  } catch (error) {
    console.error('Error fetching public jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
