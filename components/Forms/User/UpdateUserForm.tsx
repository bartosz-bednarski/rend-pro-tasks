'use client';
import React, {useEffect, useState} from 'react';
import {useUsersStore} from '@/store/useUsersStore';
import z from 'zod';
import {getUserDataAPI, putAvatarAPI, updateUserAPI} from '@/lib/api/users';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string().min(1, 'First Name must be at least 1 characters long'),
  lastName: z.string().min(1, 'Last Name must be at least 1 characters long'),
  avatar: z
    .any()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      'Please upload only one file'
    ),
});
export type UpdateUserFormFields = z.infer<typeof schema>;

export const UpdateUserForm: React.FC = () => {
  const {modalOpen, avatar, toggleModalOpen, firstName, lastName, setUserData} =
    useUsersStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<UpdateUserFormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      avatar: undefined,
    },
    resolver: zodResolver(schema),
  });
  const avatarFileList = watch('avatar');
  useEffect(() => {
    if (modalOpen) {
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setAvatarPreview(avatar);
    }
  }, [modalOpen, firstName, lastName, avatar]);

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

  const onSubmit: SubmitHandler<UpdateUserFormFields> = async (data) => {
    if (data.firstName !== firstName || data.lastName !== lastName) {
      updateUserAPI(setError, reset, data);
      getUserDataAPI(setUserData);
    }
    if (data.avatar && data.avatar.length > 0) {
      const file = data.avatar[0];
      const formData = new FormData();
      formData.append('file', file);
      await putAvatarAPI(formData, setUserData);
    }
    toggleModalOpen();
  };
  if (!modalOpen) {
    return null;
  }
  if (modalOpen) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
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
            src={avatarPreview ? avatarPreview : avatar}
            alt="Avatar preview"
            className="w-[38px] h-[38px] rounded-full object-cover"
          />
        </div>
        {errors.avatar && (
          <p className="text-red-500 text-sm">Please upload file</p>
        )}

        <button
          type="submit"
          className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-full h-min cursor-pointer"
        >
          Update
        </button>
      </form>
    );
  }
};
