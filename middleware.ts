import { NextRequest, NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login','/register']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
   const cookieStore = cookies()
  const token = (await cookies()).get('session')?.value;
  console
  if(!token){
 if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
    return NextResponse.next()
  }
let payload: { exp?: number }
  try {
    payload = jwtDecode(token)
  } catch {
    (await cookieStore).delete('session')
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
  }
const now = Math.floor(Date.now() / 1000)
  if (!payload.exp || payload.exp < now) {
    (await cookieStore).delete('session')
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
  }

  if (isPublicRoute) {
    // Token jest ważny, więc nie pozwalamy na wejście na login - przekierowanie gdzie trzeba
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}