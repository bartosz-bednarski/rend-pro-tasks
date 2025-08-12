 'use server'
 import { NextResponse } from 'next/server';
 import { cookies } from 'next/headers';
 
 export async function POST(req: Request) {
   const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('session')
    const token = tokenCookie?.value
 
   const url = "https://recruitment-task.jakubcloud.pl/auth/logout";
   
   const res = await fetch(url, {
     method: 'POST',
     headers: {'Authorization':`Bearer ${token}`, 'Content-Type': 'application/json'}
   });
 
   if (!res.ok) {
     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
   }
 
  
  cookieStore.delete('session')
   return NextResponse.json({ success: true });
 }
 
