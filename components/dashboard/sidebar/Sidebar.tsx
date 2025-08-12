'use client'

import { ButtonLogOut } from './ButtonLogOut'
import { Pockets } from './Pockets/Pockets'


export const Sidebar = () =>{

    return <div className='flex flex-col bg-white rounded-[14px] w-[274px] py-[40px] px-[24px] justify-between'>
        <Pockets/>
        <ButtonLogOut/>
    </div>
}