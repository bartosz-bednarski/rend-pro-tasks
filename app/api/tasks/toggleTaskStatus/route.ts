'use server';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(req: Request) {
  const {pocketId, taskId, isCompleted} = await req.json();
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('session');
  const token = tokenCookie?.value;

  const url = `https://recruitment-task.jakubcloud.pl/pockets/${pocketId}/tasks/${taskId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({isCompleted: isCompleted}),
  });
  if (!res.ok) {
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }

  return NextResponse.json({success: true});
}
