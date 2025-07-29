// app/api/auth/session/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const getJwtSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get('token');
        if (!tokenCookie) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }
        const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());
        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
