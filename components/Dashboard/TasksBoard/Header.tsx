'use client';
import React, {useState} from 'react';
import DotsIcon from '@/public/assets/icons/mage_dots.svg';
import TrashIcon from '@/public/assets/icons/iconoir_trash.svg';
import {ButtonToggleTasksStatus} from '@/components/ui/Buttons/ButtonToggleTasksStatus';
import {usePocketsStore} from '@/store/usePocketsStore';
import {useTasksStore} from '@/store/useTasksStore';
import {AnimatePresence, motion} from 'motion/react';
import {deletePocketAPI} from '@/lib/api/pockets';

export const Header: React.FC = () => {
  const {selectedPocket, getAllPockets, resetSelectedPocket} =
    usePocketsStore();
  const {tasks, incompletedTasks, resetActiveTasks} = useTasksStore();

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const showDeleteButtonHandler = () => {
    setShowDeleteButton((prevState) => !prevState);
  };
  const deletePocketHandler = async () => {
    await deletePocketAPI(selectedPocket);
    getAllPockets();
    resetActiveTasks();
    resetSelectedPocket();
  };

  if (selectedPocket._id === '') return null;
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between">
      <div className="flex flex-col gap-2">
        <span className="flex flex-row items-center font-normal text-[24px] text-black gap-2">
          <img
            src={`/joypixels/${selectedPocket.emoji}.png`}
            className="w-[24px] h-[24px]"
          />
          {selectedPocket.name}
          <button
            onClick={showDeleteButtonHandler}
            className={`flex items-center justify-center bg-white hover:border-gray-800 rounded-[4px] w-[30px] h-[30px] cursor-pointer`}
          >
            <img
              src={DotsIcon.src}
              className="w-[14px] h-[14px]"
              alt="dots icon"
            />
          </button>
        </span>
        <AnimatePresence>
          {showDeleteButton && (
            <motion.button
              exit={{opacity: 0}}
              onClick={deletePocketHandler}
              className="h-min sm:w-fit w-full items-center justify-center py-2.5 px-3 flex flex-row gap-[10px] bg-white rounded-[6px] drop-shadow-black cursor-pointer"
            >
              <img
                src={TrashIcon.src}
                className="w-[14px] h-[14px]"
                alt="dots icon"
              />{' '}
              <span className="text-[14px] text-[#C54D4D] font-normal">
                Delete
              </span>
            </motion.button>
          )}
        </AnimatePresence>
        <span className="text-gray-600 text-[14px]">
          Remaining {incompletedTasks.length} from {tasks.length} tasks.{' '}
        </span>
      </div>
      <ButtonToggleTasksStatus />
    </div>
  );
};
