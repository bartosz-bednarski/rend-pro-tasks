 'use server'
 import { NextResponse } from 'next/server';
 import { cookies } from 'next/headers';
 
 export async function GET(req: Request) {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('session');
    const token = tokenCookie?.value;
   const url = "https://recruitment-task.jakubcloud.pl/pockets";
   
   const res = await fetch(url, {
     method: 'GET',
     headers: {'Authorization':`Bearer ${token}`, 'Content-Type': 'application/json'}
   });
   if (!res.ok) {
     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
   }
 const data = await res.json();
   return NextResponse.json({ success: true,data:data });
 }
 
