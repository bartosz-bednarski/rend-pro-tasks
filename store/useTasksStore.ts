import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    pockets:Pocket[],
    tasks:[]
}

type Actions = {
    getAllTasks:()=>void;
    getAllPockets:()=>void;
}
type Pocket = {
    name:string,
    emoji:string
}

export const useTasksStore = create<State&Actions>()(
    immer((set)=>({
        pockets:[],
        tasks:[],
        getAllTasks:()=>set((state)=>{
            state.tasks = []
        }),
 getAllPockets:async()=>{
    try {
        const res = await fetch('/api/pockets/getAll'); // ← Twój endpoint
        const data: {success:boolean,data:Pocket[]} = await res.json();
        console.log('Pockets Store',data)
        if(!data.success)return;
        set((state) => {
          state.pockets = data.data;
        });
      } catch (err) {
        console.error('Błąd pobierania tasks', err);
      }
   },
    }))
)