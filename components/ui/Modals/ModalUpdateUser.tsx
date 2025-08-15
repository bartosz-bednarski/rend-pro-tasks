'use client';
import React from 'react';
import ArrowIcon from '@/public/assets/icons/fluent_arrow-left-28-filled.svg';
import {motion} from 'motion/react';
import {useUsersStore} from '@/store/useUsersStore';
import {useRouter} from 'next/navigation';
import {logoutUserAPI} from '@/lib/api/auth';
import {UpdateUserForm} from '@/components/Forms/User/UpdateUserForm';

export const ModalUpdateUser: React.FC = () => {
  const router = useRouter();
  const {modalOpen, toggleModalOpen} = useUsersStore();
  const logoutHandler = async () => {
    await logoutUserAPI();
    router.push('/');
    router.refresh();
  };

  if (!modalOpen) {
    return null;
  }
  if (modalOpen) {
    return (
      <>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 0.7}}
          exit={{opacity: 0}}
          className="fixed left-0 top-0 flex z-40  w-screen h-full backdrop-blur-xs bg-black opacity-50"
        ></motion.div>
        <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-screen">
          <div className="flex flex-col gap-3 bg-white sm:w-[586px] w-[90%] rounded-[26px] py-[22px] px-[31px]">
            <button
              onClick={toggleModalOpen}
              className="border-0 flex flex-row gap-1.5 p-1.5 font-medium text-[14px] text-[#6529FE] cursor-pointer"
            >
              <img src={ArrowIcon.src} alt="arrow icon" />
              Go Back
            </button>
            <UpdateUserForm />
            <button
              onClick={logoutHandler}
              className="py-2.5 px-4 bg-red-500 text-white rounded-lg w-full h-min cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }
};
