import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { auth as authMiddleware } from '@/auth';

export async function middleware(request: NextRequest) {
  // Execute the imported auth middleware
  // const authResponse = await authMiddleware({ req: request });
  // if (authResponse) {
  //   // If the auth middleware provides a response, return it
  //   return authResponse;
  // }

  // Custom middleware logic
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify') || url.pathname.startsWith('/'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  // If no redirect is necessary, return `null`
  return null;
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
