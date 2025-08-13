'use client';
import React from 'react';
import {ButtonToggleTasksStatus} from '@/components/ui/Buttons/ButtonToggleTasksStatus';
import {usePocketsStore} from '@/store/usePocketsStore';
import {useTasksStore} from '@/store/useTasksStore';

export const Header:React.FC = () => {
  const {selectedPocket} = usePocketsStore();
  const {tasks, incompletedTasks} = useTasksStore();
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
        </span>
        <span className="text-gray-600 text-[14px]">
          Remaining {incompletedTasks.length} from {tasks.length} tasks.{' '}
        </span>
      </div>
      <ButtonToggleTasksStatus />
    </div>
  );
};
