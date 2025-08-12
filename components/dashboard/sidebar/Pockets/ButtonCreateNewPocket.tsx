'use client'
import Icon from '@/public/assets/icons/fluent_key-command-24-regular.svg'
export const ButtonCreateNewPocket = () =>{


    return <button className='flex flex-row justify-between w-full rounded-full py-2 pl-3 pr-2 bg-gray-50 cursor-pointer'>
<div className='flex flex-row items-center gap-[18px] text-black font-medium leading-[100%]'>
    <span className='text-[16px]'>+</span>
    <span className='text-[14px]'>Create new pocket</span>
</div>
<div className='flex flex-row gap-1'>
    <span className='flex items-center justify-center bg-white rounded-full w-[18px] h-[18px]'>
        <img src={Icon.src} className='w-[14px] h-[14px]'/>
    </span>
     <span className='bg-white rounded-full w-[18px] h-[18px] text-[12px] font-medium'>
       P
    </span>
</div>
    </button>
}