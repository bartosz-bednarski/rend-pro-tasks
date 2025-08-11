import Image from "next/image";
import { cookies } from 'next/headers';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default async function DashboardPage() {
  // const data = await logIn("bb8","Test10082025")
  // await createSession(data)
  // console.log(data)
  return (
    
     <Dashboard/>
  );
}
