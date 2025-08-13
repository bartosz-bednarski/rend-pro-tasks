'use client';
import React from 'react';
import Icon from '@/public/assets/icons/fluent_key-command-24-regular.svg';

interface ButtonCreateNewPocketProps {
  onClick: () => void;
  mobilePlus: boolean;
}

export const ButtonCreateNewPocket: React.FC<ButtonCreateNewPocketProps> = ({
  onClick,
  mobilePlus,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row justify-between sm:w-full ${mobilePlus && 'w-fit py-1.5 px-2'} ${!mobilePlus && 'py-2 pl-3 pr-2'} rounded-full sm:py-2 sm:pl-3 sm:pr-2  bg-gray-50 cursor-pointer`}
    >
      <div className="flex flex-row items-center gap-[18px] text-black font-medium leading-[100%]">
        <span className="text-[16px] sm:w-auto w-[16px] h-[16px]">+</span>
        <span
          className={`text-[14px] sm:block ${mobilePlus && 'hidden'} ${!mobilePlus && 'block'}`}
        >
          Create new pocket
        </span>
      </div>
      <div
        className={`${mobilePlus && 'hidden'} ${!mobilePlus && 'flex'} sm:flex flex-row gap-1`}
      >
        <span className="flex items-center justify-center bg-white rounded-full w-[18px] h-[18px]">
          <img src={Icon.src} className="w-[14px] h-[14px]" />
        </span>
        <span className="bg-white rounded-full w-[18px] h-[18px] text-[12px] font-medium">
          P
        </span>
      </div>
    </button>
  );
};
