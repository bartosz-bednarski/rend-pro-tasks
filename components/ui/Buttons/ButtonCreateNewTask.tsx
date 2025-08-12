'use client'

import { useState } from 'react'
import IconArrow from '@/public/assets/icons/ph_caret-down-light.svg'
import IconCommand from '@/public/assets/icons/fluent_key-command-24-regular-white.svg'
import { usePocketsStore } from '@/store/usePocketsStore'
export const ButtonToggleModal = () =>{
const {modalOpen,newPocketOpen,toggleModalOpen,hideNewPocket} = usePocketsStore()

const onClickHandler = () =>{
    
    if(newPocketOpen){
hideNewPocket()
    }
    toggleModalOpen()
}

    return <button onClick={onClickHandler} className={`z-30 fixed bottom-5 left-1/2 -translate-x-1/2 w-[400px] flex flex-row rounded-[35px] py-1.5 pr-1.5 pl-4 ${modalOpen?"bg-[#6529FE]":"bg-gray-900 text-white"} justify-between cursor-pointer`}>
<div className='flex flex-row gap-[10px] items-center'>
<img src={IconArrow.src} alt='arrow icon' className='w-[16px] h-[16px]'/>
<span className='text-[14px] font-normal text-white'>Create new task</span>
</div>
<div className='flex flex-row gap-[4px]'>
    <span className={`flex items-center justify-center ${modalOpen?'bg-[#6126EB]':'bg-gray-700'} rounded-full w-[32px] h-[32px]`}>
        <img src={IconCommand.src} alt='command icon' className='w-[16px] h-[16px]'/>
    </span>
    <span className={`flex items-center text-white justify-center ${modalOpen?'bg-[#6126EB]':'bg-gray-700'} rounded-full w-[32px] h-[32px] font-medium text-[16px]`}>N</span>
</div>
    </button>
}