import LoginForm from '@/components/Forms/LoginForm';
import LayoutImage from '@/public/assets/images/login_layout.png';
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
