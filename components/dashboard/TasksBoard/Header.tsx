'use client'

import { ButtonToggleTasksStatus } from '@/components/ui/Buttons/ButtonToggleTasksStatus'
import { usePocketsStore } from '@/store/usePocketsStore'

export const Header = () =>{
const {selectedPocket} = usePocketsStore()
if(selectedPocket._id==='')return null
    return <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-2'>
            <span className='flex flex-row items-center font-normal text-[24px] text-black gap-2'>
<img src={`/joypixels/${selectedPocket.emoji}.png`} className='w-[24px] h-[24px]'/>
{selectedPocket.name}
            </span>
            <span className='text-gray-600 text-[14px]'>Remaining 8 from 16 tasks. </span>
        </div>
        <ButtonToggleTasksStatus/>
    </div>
}