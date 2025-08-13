'use client';
import React from 'react';
import {useState} from 'react';

interface InputFileFormEditUserProps {
  success: boolean;
  error: string;
  avatarDefault: string;
  avatarHandler: (avatar: string) => void;
}

export const InputFileFormEditUser: React.FC<InputFileFormEditUserProps> = ({
  success,
  avatarHandler,
  avatarDefault,
  error,
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string>(avatarDefault);
  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarPreview(reader.result);
        avatarHandler(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex flex-row gap-2.5">
        <label
          htmlFor="avatar"
          className="relative w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg cursor-pointer"
        >
          <span className="text-gray-800 text-md text-left w-full">
            Click to upload your avatar
          </span>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={saveImage}
            className="hidden"
          />
        </label>
        <img
          src={avatarPreview ? avatarPreview : avatarDefault}
          alt="Avatar preview"
          className="w-[38px] h-[38px] rounded-full object-cover"
        />
      </div>{' '}
      {!success && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
};
