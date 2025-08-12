'use client'


import { ButtonToggleModal } from '../ui/Buttons/ButtonCreateNewTask';
import { ModalNewTask } from '../ui/Modals/ModalNewTask';
import { Sidebar } from './Sidebar/Sidebar';
import { useEffect } from 'react';
import { usePocketsStore } from '@/store/usePocketsStore';
import { TasksBoard } from './TasksBoard/TasksBoard';
import { useUsersStore } from '@/store/useUsersStore';

export const Dashboard = () =>{
  const {getAllPockets,pockets} = usePocketsStore()
  const {prevAvatar,setAvatar} = useUsersStore()
  useEffect(()=>{
    console.log(prevAvatar)
    const setAvatarAPI =async()=>{
      const resAvatar= await fetch('/api/users/putAvatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({avatar:prevAvatar}),
        });
    const data:{success:boolean,data:any}= await resAvatar.json();
    if(!data.success)return
    setAvatar(data.data.avatar)
    }
    setAvatarAPI()
getAllPockets()
  },[])
       console.log(pockets) 

    return <><main className='flex flex-row p-2.5 bg-gray-50 w-full h-full min-h-[100vh]'>
      <Sidebar/>
      <TasksBoard/>
      <ModalNewTask/>
      <ButtonToggleModal/>
      </main>
      
      </>
}