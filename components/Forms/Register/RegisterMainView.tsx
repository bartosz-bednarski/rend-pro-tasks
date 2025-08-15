'use client';
import React, {useEffect} from 'react';
import LayoutImage from '@/public/assets/images/register_main_view_layout.jpg';
import z from 'zod';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import AvatarDefault from '@/public/assets/images/avatar_default.png';
const schema = z.object({
  firstName: z.string().min(1, 'First Name must be at least 1 characters long'),
  lastName: z.string().min(1, 'Last Name must be at least 1 characters long'),
  avatar: z
    .any()
    .refine((files) => files?.length === 1, 'Please upload one file'),
});

type FormFields = z.infer<typeof schema>;

interface RegisterMainViewProps {
  onSuccess: (firstName: string, lastName: string, avatar: File) => void;
}

export const RegisterMainViewForm: React.FC<RegisterMainViewProps> = ({
  onSuccess,
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<FormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      avatar: undefined,
    },
    resolver: zodResolver(schema),
  });
  const avatarFileList = watch('avatar');
  useEffect(() => {
    if (avatarFileList && avatarFileList.length > 0) {
      const file = avatarFileList[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  }, [avatarFileList]);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      onSuccess(data.firstName, data.lastName, data.avatar[0]);
    } catch (error) {
      console.log(error);
      setError('root', {
        message: `${String(error).replace('Error:', '')}`,
      });
    }
  };

  return (
    <main className="flex flex-row items-center justify-center h-screen w-full">
      <img src={LayoutImage.src} className="w-full h-full  blur-sm" />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="flex absolute top-0 left-0 w-full h-full items-center justify-center ">
        <div className="z-10 sm:w-[586px] sm:h-auto rounded-[26px] bg-white flex flex-col gap-4 py-[22px] px-[31px]">
          <h1 className="font-medium text-black text-2xl">Almost there!</h1>
          <p className="font-normal text-[14px]">
            We just need some more information...
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg">
              <input
                {...register('firstName')}
                type="text"
                className="w-full border-0 outline-none size-4 placeholder-gray-800 "
                placeholder="First Name"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
            <div className="w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg">
              <input
                {...register('lastName')}
                type="text"
                className="w-full border-0 outline-none size-4 placeholder-gray-800 "
                placeholder="Last Name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
            <div className="flex flex-row gap-2.5">
              <label
                htmlFor="avatar"
                className="relative w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg cursor-pointer"
              >
                <span className="text-gray-800 text-md text-left w-full">
                  Click to upload your avatar
                </span>
                <input
                  {...register('avatar')}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <img
                src={avatarPreview ? avatarPreview : AvatarDefault.src}
                alt="Avatar preview"
                className="w-[38px] h-[38px] rounded-full object-cover"
              />
            </div>
            {errors.avatar && (
              <p className="text-red-500 text-sm">Please upload file</p>
            )}
            <button
              type="submit"
              className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
