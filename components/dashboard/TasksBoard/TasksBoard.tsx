'use client'

import { useTasksStore } from '@/store/useTasksStore'
import { Header } from './Header'
import { TasksItem } from './TaskItem'

export const TasksBoard = () =>{
const {tasks,incompletedTasks,showIncompletedTasks} = useTasksStore()

if(showIncompletedTasks){
  return <div className='flex flex-col w-full h-full p-10 gap-10'>
<Header/>
<div className='flex flex-col gap-[8px]'>
{incompletedTasks.map(task=><TasksItem {...task} key={task._id}/>)}
    
</div>
    </div>
}
  return <div className='flex flex-col w-full h-full p-10 gap-10'>
<Header/>
<div className='flex flex-col gap-[8px]'>
{tasks.map(task=><TasksItem {...task} key={task._id}/>)}
    
</div>
    </div>
  
}