import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
    newPocketOpen:boolean,
    modalOpen:boolean,
    pockets:Pocket[],
}

type Actions = {
    showNewPocket:()=>void,
    hideNewPocket:()=>void,
    toggleModalOpen:()=>void,
    getAllPockets:()=>void;
}
export type Pocket = {
    createdAt:string,
emoji:string,
name:string,
tasks: [],
updatedAt: string,
user: string,
__v: number,
_id: string
}

export const usePocketsStore = create<State&Actions>()(
    immer((set)=>({
        pockets:[],
        newPocketOpen:false,
        modalOpen:false,
          showNewPocket:()=>set((state)=>{
             state.modalOpen=true;
            state.newPocketOpen=true;
        }),
         hideNewPocket:()=>set((state)=>{
             state.newPocketOpen=false;
        }),
      
         toggleModalOpen:()=>set((state)=>{
            state.modalOpen = !state.modalOpen
        }),
 getAllPockets:async()=>{
    try {
        const res = await fetch('/api/pockets/getAll');
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