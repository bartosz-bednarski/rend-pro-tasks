'use client';
import React from 'react';
import UserIcon from '@/public/assets/icons/ph_user.svg';
import LayoutImage from '@/public/assets/images/login_layout.png';
import Link from 'next/link';
import z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormFields = z.infer<typeof schema>;

interface RegisterFormProps {
  onSuccess: (login: string, password: string) => void;
  fetchError: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  fetchError,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<FormFields>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      onSuccess(data.login, data.password);
    } catch (error) {
      console.log(error);
      setError('root', {
        message: `${String(error).replace('Error:', '')}`,
      });
    }
  };

  return (
    <main className="flex flex-row items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-8 w-full sm:w-[520px] shrink-0 py-10 px-5 sm:py-44 sm:px-14  ">
        <h1 className="font-bold">Register</h1>
        <form
          className="flex flex-col gap-2.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg">
            <img className="w-5 h-5" src={UserIcon.src} alt="emoji" />
            <input
              {...register('login')}
              type="text"
              className="w-full border-0 outline-none size-4 placeholder-gray-800 "
              placeholder="Username"
            />
          </div>
          {errors.login && (
            <p className="text-red-500 text-sm">{errors.login.message}</p>
          )}
          <div className="w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg">
            <img className="w-5 h-5" src={UserIcon.src} alt="emoji" />
            <input
              {...register('password')}
              type="text"
              className="w-full border-0 outline-none size-4 placeholder-gray-800 "
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min"
          >
            Register
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
