import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
   prevAvatar:File|null,
   avatar:string;
}

type Actions = {
  setPrevAvatar:(avatar:File)=>void;
  setAvatar:(avatar:string)=>void;
}

export const useUsersStore = create<State&Actions>()(
    immer((set)=>({
      prevAvatar:null,
      avatar:'',
           setPrevAvatar:(avatar)=>{
set((state) => {
                 state.prevAvatar = avatar;
               });
           },
            setAvatar:(avatar)=>{
set((state) => {
                 state.avatar = avatar;
               });
           }

    }))
)