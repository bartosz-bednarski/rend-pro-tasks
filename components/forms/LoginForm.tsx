'use client';
import UserIcon from '@/public/assets/icons/ph_user.svg';
import PasswordIcon from '@/public/assets/icons/carbon_password.svg';
import Link from 'next/link';
import {useState} from 'react';
import {z} from 'zod';
import {InputTextForm} from '../ui/Inputs/InputTextForm';
import {useRouter} from 'next/navigation';

type LoginFormType = {
  login: {
    value: string;
    success: boolean;
    error: string;
  };
  password: {
    value: string;
    success: boolean;
    error: string;
  };
  success: boolean;
  error: string;
};

const loginSchema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const INITIAL_LOGIN_FORM: LoginFormType = {
  login: {
    value: '',
    success: true,
    error: '',
  },
  password: {
    value: '',
    success: true,
    error: '',
  },
  success: true,
  error: 'Wrong login or password',
};

export const LoginForm = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);

  const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState: LoginFormType) => ({
      ...prevState,
      login: {...prevState.login, value: e.target.value},
    }));
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState: LoginFormType) => ({
      ...prevState,
      password: {...prevState.password, value: e.target.value},
    }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginForm(INITIAL_LOGIN_FORM);
    const result = loginSchema.safeParse({
      login: loginForm.login.value,
      password: loginForm.password.value,
    });

    if (!result.success) {
      const newState = {...loginForm};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'login') {
          newState.login.success = false;
          newState.login.error = err.message;
        }
        if (err.path[0] === 'password') {
          newState.password.success = false;
          newState.password.error = err.message;
        }
      });
      setLoginForm(newState);
      return;
    }

    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: loginForm.login.value,
        password: loginForm.password.value,
      }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        setLoginForm((prevState) => ({
          ...prevState,
          success: false,
          error: 'Wrong login or password',
        }));
      } else {
        setLoginForm((prev) => ({
          ...prev,
          success: false,
          error: 'Server error, try again later',
        }));
      }
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col gap-8 w-full sm:w-[520px] shrink-0 py-10 px-5 sm:py-44 sm:px-14  ">
      <h1 className="font-bold">Login</h1>
      <form onSubmit={submitFormHandler} className="flex flex-col gap-2.5">
        <InputTextForm
          value={loginForm.login.value}
          icon={UserIcon}
          onChange={loginHandler}
          success={loginForm.login.success}
          error={loginForm.login.error}
          placeholder="Username"
        />
        <InputTextForm
          value={loginForm.password.value}
          icon={PasswordIcon}
          onChange={passwordHandler}
          success={loginForm.password.success}
          error={loginForm.password.error}
          placeholder="Password"
        />

        {!loginForm.success && (
          <p className="text-red-500 text-sm">{loginForm.error}</p>
        )}
        <button
          type="submit"
          className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min cursor-pointer"
        >
          Login me
        </button>
      </form>
      <p className="font-normal">
        Don’t have account?{' '}
        <Link className="text-purple-600" href="/register">
          Register now
        </Link>
      </p>
    </div>
  );
};
