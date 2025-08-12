'use client'
import DotsIcon from '@/public/assets/icons/mage_dots.svg'
import DotsWhiteIcon from '@/public/assets/icons/mage_dots_white.svg'
import { usePocketsStore } from '@/store/usePocketsStore'
import { Task, useTasksStore } from '@/store/useTasksStore'
export const TasksItem =({description,isCompleted,_id}:Task)=>{
const {selectedPocket} =usePocketsStore();
const {getAllTasks} =useTasksStore();
const completedStatusHandler = async() =>{
 try {
               const res= await fetch('/api/tasks/toggleTaskStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({pocketId:selectedPocket._id,taskId:_id,isCompleted:!isCompleted}),
    });
               const data: {success:boolean,data:[]} = await res.json();
              
               if(!data.success)return;
             } catch (err) {
               console.error('Błąd pobierania tasks', err);
             }
             getAllTasks(selectedPocket._id)
}

    return <div className={`flex flex-row justify-between py-[4px] pl-[8px] pr-[4px] w-full ${isCompleted?"bg-[#6529FE]":'bg-white'} rounded-[6px]`}>
<div className={`flex flex-row gap-[10px] text-[14px] font-normal ${isCompleted?'text-white line-through':'text-black'} items-center`}>
<button onClick={completedStatusHandler} className={`w-[24px] h-[24px] border-[1px] ${isCompleted?'border-[#6126EB] bg-[#9781FF]':'border-gray-200'} rounded-[6px] cursor-pointer`}></button>{description}
</div>
<button className={`flex items-center justify-center ${isCompleted?'bg-[#754EFF]':'bg-gray-50'} rounded-[4px] w-[30px] h-[30px]`}>
    <img src={isCompleted?DotsWhiteIcon.src:DotsIcon.src} className='w-[14px] h-[14px]' alt='dots icon'/>
</button>
    </div>
}