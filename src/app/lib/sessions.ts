// import 'server-only'
// import { cookies } from 'next/headers'
// import { jwtDecode } from 'jwt-decode'
// import { logIn } from '@/app/api/auth'
 
// export async function createSession(token: string) {
//     // const token = await logIn()
//   const expiresAt = jwtDecode(token).exp
//   const cookieStore = await cookies()
 
//   cookieStore.set('session', token, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   })
// }

// export async function deleteSession() {
//   const cookieStore = await cookies()
//   cookieStore.delete('session')
// }