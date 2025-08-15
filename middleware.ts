import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {jwtDecode} from 'jwt-decode';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookieStore = cookies();
  const token = (await cookies()).get('session')?.value;

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
  }
  let payload: {exp?: number};
  try {
    payload = jwtDecode(token);
  } catch {
    (await cookieStore).delete('session');
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
  }
  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp < now) {
    (await cookieStore).delete('session');
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
