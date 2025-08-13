'use client';
import React from 'react';
import {AddPocket} from './AddPocket';
import {AddTask} from './AddTask';
import {usePocketsStore} from '@/store/usePocketsStore';
import {motion} from 'motion/react';
export const ModalNewTask: React.FC = () => {
  const {modalOpen, newPocketOpen} = usePocketsStore();

  if (!modalOpen) {
    return null;
  }
  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 0.7}}
        exit={{opacity: 0}}
        className="fixed left-0 top-0 flex  w-screen h-full backdrop-blur-xs bg-white opacity-50"
      ></motion.div>
      <div className="fixed flex justify-center items-end z-10 top-0 left-0 w-screen h-screen">
        {newPocketOpen && <AddPocket />}
        {!newPocketOpen && <AddTask />}
      </div>
    </>
  );
};
