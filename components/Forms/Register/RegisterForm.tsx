'use client';
import React from 'react';
import UserIcon from '@/public/assets/icons/ph_user.svg';
import PasswordIcon from '@/public/assets/icons/carbon_password.svg';
import LayoutImage from '@/public/assets/images/login_layout.png';
import Link from 'next/link';
import z from 'zod';
import {useState} from 'react';
import {InputTextForm} from '../../ui/Inputs/InputTextForm';

type RegisterFormType = {
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
};

const INITIAL_LOGIN_FORM: RegisterFormType = {
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
};

const registerSchema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

interface RegisterFormProps {
  onSuccess: (login: string, password: string) => void;
  fetchError: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  fetchError,
}) => {
  const [registerForm, setRegisterForm] = useState(INITIAL_LOGIN_FORM);
  const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevState: RegisterFormType) => ({
      ...prevState,
      login: {...prevState.login, value: e.target.value},
    }));
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prevState: RegisterFormType) => ({
      ...prevState,
      password: {...prevState.password, value: e.target.value},
    }));
  };
  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterForm(INITIAL_LOGIN_FORM);
    const result = registerSchema.safeParse({
      login: registerForm.login.value,
      password: registerForm.password.value,
    });

    if (!result.success) {
      const newState = {...registerForm};
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

      setRegisterForm(newState);
      return;
    }
    onSuccess(registerForm.login.value, registerForm.password.value);
  };

  return (
    <main className="flex flex-row items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-8 w-full sm:w-[520px] shrink-0 py-10 px-5 sm:py-44 sm:px-14  ">
        <h1 className="font-bold">Register</h1>
        <form className="flex flex-col gap-2.5" onSubmit={submitFormHandler}>
          <InputTextForm
            value={registerForm.login.value}
            icon={UserIcon}
            onChange={loginHandler}
            success={registerForm.login.success}
            error={registerForm.login.error}
            placeholder="Username"
          />
          <InputTextForm
            value={registerForm.password.value}
            icon={PasswordIcon}
            onChange={passwordHandler}
            success={registerForm.password.success}
            error={registerForm.password.error}
            placeholder="Password"
          />

          <button
            type="submit"
            className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min"
          >
            Login me
          </button>
        </form>
        <p className="font-normal">
          Have account already?{' '}
          <Link className="text-purple-600" href="/login">
            Login
          </Link>
        </p>
        {fetchError && (
          <p className="text-red-500 text-sm">Server error, try again later</p>
        )}
      </div>
      <div className="flex-1 sm:flex hidden h-full">
        <img src={LayoutImage.src} className="w-full h-full object-cover" />
      </div>
    </main>
  );
};
