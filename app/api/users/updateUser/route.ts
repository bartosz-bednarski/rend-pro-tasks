'use server';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(req: Request) {
  const {firstName, lastName} = await req.json();
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('session');
  const token = tokenCookie?.value;

  const url = `https://recruitment-task.jakubcloud.pl/users/update`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({firstName, lastName}),
  });
  if (!res.ok) {
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }

  return NextResponse.json({success: true});
}
