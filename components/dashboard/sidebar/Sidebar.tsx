'use client'

import { ButtonLogOut } from '../../ui/Buttons/ButtonLogOut'
import { Pockets } from './Pockets'


export const Sidebar = () =>{

    return <div className='flex flex-col bg-white rounded-[14px] w-[274px] py-[40px] px-[24px] justify-between'>
        <Pockets/>
        <ButtonLogOut/>
    </div>
}