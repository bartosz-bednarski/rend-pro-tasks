'use server'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export async function POST(req: Request) {
  const { login, password } = await req.json();

  const url = "https://recruitment-task.jakubcloud.pl/auth/login";
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const data = await res.json();
  console.log('DATA',data)
  const token = data.token;

  // decode token to get expiry
  const decoded: { exp?: number } = jwtDecode(token);
  const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : undefined;

  // set cookie
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true });
}
