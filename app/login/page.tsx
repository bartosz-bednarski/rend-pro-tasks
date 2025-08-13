import dynamic from 'next/dynamic';
import LayoutImage from '@/public/assets/images/login_layout.png';

const LoginForm = dynamic(() => import('@/components/Forms/LoginForm'), { ssr: false });
export default function LoginPage() {
  return (
    <main className="flex flex-row items-center justify-center h-screen w-full">
      <LoginForm />
      <div className="flex-1 sm:flex hidden h-full">
        <img src={LayoutImage.src} className="w-full h-full object-cover" />
      </div>
    </main>
  );
}
