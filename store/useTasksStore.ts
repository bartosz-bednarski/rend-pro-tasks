import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    tasks:Task[],
}
export type Task ={
createdAt:string,
description:string,
isCompleted:boolean,
pocket:string,
updatedAt:string,
user:string,
__v:number,
_id:string
}

type Actions = {
    getAllTasks:(pocketId:string)=>void;
}

export const useTasksStore = create<State&Actions>()(
    immer((set)=>({
         tasks:[],
         getAllTasks:async(pocketId)=>{
           try {
               const res= await fetch('/api/tasks/getAll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({pocketId}),
    });
               const data: {success:boolean,data:[]} = await res.json();
               console.log('Tasks Store',data)
               if(!data.success)return;
               set((state) => {
                 state.tasks = data.data;
               });
             } catch (err) {
               console.error('Błąd pobierania tasks', err);
             }
          },

    }))
)