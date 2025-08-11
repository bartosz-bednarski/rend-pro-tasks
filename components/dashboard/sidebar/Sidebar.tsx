'use client'

import { ButtonPocketCategory } from './ButtonPocketCategory/ButtonPocketCategory'

const POCKETS_LIST = [
    {
        icon:'1F3E0',
        name:'Home'
    },
      {
        icon:'1F966',
        name:'Diet'
    },
      {
        icon:'1F4DA',
        name:'List of books'
    },
]

export const Sidebar = () =>{

    return <div className='flex flex-col bg-white rounded-[14px] w-[274px] py-[40px] px-[24px] justify-between'>
        <div className='flex flex-col gap-5'>
<h2>Pockets</h2>
{POCKETS_LIST.map((pocket,index)=><ButtonPocketCategory icon={pocket.icon} name={pocket.name} key={index}/>)}
        </div>
        
    </div>
}