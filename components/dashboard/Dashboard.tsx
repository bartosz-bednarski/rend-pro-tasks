'use client';

import {ButtonToggleModal} from '../ui/Buttons/ButtonToggleModal';
import {ModalNewTask} from '../ui/Modals/ModalNewTask';
import {Sidebar} from './Sidebar/Sidebar';
import {useEffect} from 'react';
import {usePocketsStore} from '@/store/usePocketsStore';
import {TasksBoard} from './TasksBoard/TasksBoard';

export const Dashboard = () => {
  const {getAllPockets, pockets} = usePocketsStore();
  useEffect(() => {
    getAllPockets();
  }, []);
  console.log(pockets);

  return (
    <>
      <main className="flex flex-row p-2.5 bg-gray-50 w-full h-full min-h-[100vh]">
        <Sidebar />
        <TasksBoard />
        <ModalNewTask />
        <ButtonToggleModal />
      </main>
    </>
  );
};
