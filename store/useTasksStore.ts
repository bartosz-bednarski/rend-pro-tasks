import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    tasks:[],
}

type Actions = {
    getAllTasks:()=>void;
}

export const useTasksStore = create<State&Actions>()(
    immer((set)=>({
        
        tasks:[],
        
         
        getAllTasks:()=>set((state)=>{
            state.tasks = []
        }),

    }))
)