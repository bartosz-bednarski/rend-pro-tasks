'use server';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('session');
  const token = tokenCookie?.value;
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({error: 'No file provided'}, {status: 400});
  }

  const uploadForm = new FormData();
  uploadForm.append('file', file);

  const url = 'https://recruitment-task.jakubcloud.pl/users/avatar';
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: uploadForm,
  });
  if (!res.ok) {
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }
  const data = await res.json();

  return NextResponse.json({success: true, data: data});
}
