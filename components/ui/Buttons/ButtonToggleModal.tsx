'use client';
import IconArrow from '@/public/assets/icons/ph_caret-down-light.svg';
import IconCommand from '@/public/assets/icons/fluent_key-command-24-regular-white.svg';
import {usePocketsStore} from '@/store/usePocketsStore';
import {motion} from 'motion/react';

export const ButtonToggleModal = () => {
  const {modalOpen, newPocketOpen, toggleModalOpen, hideNewPocket} =
    usePocketsStore();

  const onClickHandler = () => {
    if (newPocketOpen) {
      hideNewPocket();
    }
    toggleModalOpen();
  };

  return (
    <button
      onClick={onClickHandler}
      className={`z-30 fixed sm:bottom-5 bottom-4 sm:left-1/2 left-auto right-4 sm:-translate-x-1/2 sm:w-[400px] w-[44px] sm:h-fit h-[44px] flex flex-row rounded-[35px] py-1.5 pr-1.5 sm:pl-4 pl-1.5 ${modalOpen ? 'bg-[#6529FE] hover:bg-[#4813C4]' : 'bg-gray-900 text-white hover:bg-black '} transition-all sm:justify-between justify-center cursor-pointer`}
    >
      <div className="flex flex-row gap-[10px] items-center">
        <motion.img
          animate={{rotate: modalOpen ? 180 : 0}}
          src={IconArrow.src}
          alt="arrow icon"
          className="w-[16px] h-[16px]"
        />
        <span className="sm:block hidden text-[14px] font-normal text-white">
          Create new task
        </span>
      </div>
      <div className="sm:flex hidden flex-row gap-[4px]">
        <span
          className={`flex items-center justify-center ${modalOpen ? 'bg-[#6126EB]' : 'bg-gray-700'} rounded-full w-[32px] h-[32px]`}
        >
          <img
            src={IconCommand.src}
            alt="command icon"
            className="w-[16px] h-[16px]"
          />
        </span>
        <span
          className={`flex items-center text-white justify-center ${modalOpen ? 'bg-[#6126EB]' : 'bg-gray-700'} rounded-full w-[32px] h-[32px] font-medium text-[16px]`}
        >
          N
        </span>
      </div>
    </button>
  );
};
