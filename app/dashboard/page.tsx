import Image from "next/image";
import { cookies } from 'next/headers';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default async function DashboardPage() {
  // const data = await logIn("bb8","Test10082025")
  // await createSession(data)
  // console.log(data)
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <Dashboard/>
    </div>
  );
}
