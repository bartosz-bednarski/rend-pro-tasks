 'use server'
 import { NextResponse } from 'next/server';
 import { cookies } from 'next/headers';
 import { jwtDecode } from 'jwt-decode';
 
 export async function POST(req: Request) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.has('session')
    let token
    if(sessionCookie)token =  cookieStore.get('session')
 
   const url = "https://recruitment-task.jakubcloud.pl/auth/logout";
   
   const res = await fetch(url, {
     method: 'POST',
     headers: {'Authorization':`${token}`, 'Content-Type': 'application/json'}
   });
 
   if (!res.ok) {
     return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
   }
 
  
  cookieStore.delete('session')
   return NextResponse.json({ success: true });
 }
 
