import dynamic from 'next/dynamic';
const RegisterLayout = dynamic(() => import('@/components/Forms/Register/RegisterLayout'), { ssr: false });


export default function RegisterPage() {
  return <RegisterLayout />;
}
