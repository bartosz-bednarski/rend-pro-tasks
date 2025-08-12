'use client'

import { AddPocket } from './AddPocket'
import { AddTask } from './AddTask'
import { usePocketsStore } from '@/store/usePocketsStore'
export const ModalNewTask = () =>{
const {modalOpen,newPocketOpen,hideNewPocket} = usePocketsStore();

if(!modalOpen){
    return null
}
    return <><div className='fixed left-0 top-0 flex  w-screen h-full backdrop-blur-xs bg-white opacity-20'>   
    </div>
    <div className='fixed flex justify-center items-end z-10 top-0 left-0 w-screen h-screen'>
        {newPocketOpen&&<AddPocket/>}
        {!newPocketOpen&&<AddTask/>}
        </div>
        </>
}