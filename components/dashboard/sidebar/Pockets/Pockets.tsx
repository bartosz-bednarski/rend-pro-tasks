'use client'
import { useTasksStore } from '@/store/useTasksStore'
import { ButtonCreateNewPocket } from './ButtonCreateNewPocket'
import { ButtonPocketCategory } from './ButtonPocketCategory'

const POCKETS_LIST = [
    {
        icon:'1F3E0',
        name:'Home',
        active:true
    },
      {
        icon:'1F966',
        name:'Diet',
        active:false
    },
      {
        icon:'1F4DA',
        name:'List of books',
        active:false
    },
]

export const Pockets = () =>{
const {pockets} = useTasksStore()
    return <div className='flex flex-col gap-5'>
<h2>Pockets</h2>
{pockets.map((pocket,index)=><ButtonPocketCategory {...pocket} active={true} key={index}/>)}
<ButtonCreateNewPocket/>
        </div>
}