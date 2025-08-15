'use client';
import React from 'react';
import {useUsersStore} from '@/store/useUsersStore';
import {useEffect} from 'react';
import {getUserDataAPI} from '@/lib/api/users';

export const ButtonShowProfile: React.FC = () => {
  const {avatar, firstName, lastName, setUserData, toggleModalOpen} =
    useUsersStore();

  useEffect(() => {
    if (avatar === '') {
      getUserDataAPI(setUserData);
    }
  }, [avatar]);

  return (
    <button
      onClick={toggleModalOpen}
      className="flex flex-row gap-3 min-h-8 cursor-pointer items-center"
    >
      {avatar && (
        <img
          className="w-[38px] h-[38px] rounded-full"
          src={avatar}
          alt="user avatar"
        />
      )}

      <div className="sm:flex hidden flex-col gap-0.5 font-medium ">
        <span className="text-[14px] text-black">
          {firstName} {lastName}
        </span>
      </div>
    </button>
  );
};
