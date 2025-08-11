import { cookies } from 'next/headers';

export default async function Home() {
  // const data = await logIn("bb8","Test10082025")
  // await createSession(data)
  // console.log(data)
    const cookieStore = await cookies();
  const sessionCookie = cookieStore.has('session')
  console.log('/ SESSION COOKIE',sessionCookie)
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      
      </main>
      
    </div>
  );
}
