'use client'

import { useTasksStore } from '@/store/useTasksStore'
import { useStore } from 'zustand'

interface ButtonPocketCategoryProps{
    emoji:string,
    name:string,
    active:boolean
}

export const ButtonPocketCategory = ({emoji,name,active}:ButtonPocketCategoryProps) =>{
const {getAllPockets} = useTasksStore()
   

    return <button onClick={getAllPockets} className={`flex flex-row w-full py-1.5 px-2 justify-between ${active&&'bg-[#6529FE]'} items-center rounded-[6px] cursor-pointer`}>
        <div className={`flex flex-row gap-4 ${active?'text-white':'black'} font-medium items-center`}>
<img className='w-[16px] h-[16px]' src={`/joypixels/${emoji}.png`}/>
{name}
</div>
<span className={`w-[24px] h-[24px] ${active?'bg-[#754EFF]':'bg-gray-50'} rounded-[4px] text-[14px] font-normal ${active?'text-white':'text-[#595959]'} align-middle text-center`}>8</span>
    </button>
}