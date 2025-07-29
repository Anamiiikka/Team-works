// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  return new TextEncoder().encode(secret);
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get('token');

  // Define protected routes
  const protectedAdminRoutes = ['/cms/careers', '/cms/leads', '/cms/admin'];

  // If accessing auth pages, let them pass
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Check if the route is protected
  if (protectedAdminRoutes.some(route => pathname.startsWith(route))) {
    if (!tokenCookie || !tokenCookie.value) {
      // Redirect to login if no token
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(tokenCookie.value, getJwtSecret());

      // Check for role
      const { role } = payload;
      if (!role) {
        throw new Error('Role not found in token.');
      }

      // SuperAdmin has full access
      if (role === 'SuperAdmin') {
        return NextResponse.next();
      }

      // Admin can access all CMS but not SuperAdmin specific areas (if any)
      if (role === 'Admin' && pathname.startsWith('/cms')) {
         return NextResponse.next();
      }

      // Employee access is restricted (example: can't access admin user management)
      if (role === 'Employee' && pathname.startsWith('/cms/admin')) {
         return NextResponse.redirect(new URL('/cms', request.url)); // Redirect to base CMS page
      }

      // If none of the above, allow access for valid roles to their permitted areas
      return NextResponse.next();

    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      // Token is invalid, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: ['/cms/:path*', '/auth/:path*'],
};
