'use server'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { avatar } = await req.json();
 const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('session')
    const token = tokenCookie?.value

  const url = "https://recruitment-task.jakubcloud.pl/users/avatar";
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Authorization':`Bearer ${token}`,'Content-Type': 'application/json' },
    body: JSON.stringify({ file:avatar}),
  });
console.log(res)
  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const data = await res.json();
  console.log(data)


 

  return NextResponse.json({ success: true,data:data });
}
