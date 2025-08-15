'use client';
import React from 'react';
import UserIcon from '@/public/assets/icons/ph_user.svg';
import Link from 'next/link';
import {z} from 'zod';
import {useRouter} from 'next/navigation';
import {loginUserAPI} from '@/lib/api/auth';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormFields = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const router = useRouter();

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
      await loginUserAPI(data.login, data.password);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      setError('root', {
        message: `${String(error).replace('Error:', '')}`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full sm:w-[520px] shrink-0 py-10 px-5 sm:py-44 sm:px-14  ">
      <h1 className="font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
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
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
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
