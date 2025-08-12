'use client'
import { ButtonCreateNewPocket } from '../../ui/Buttons/ButtonCreateNewPocket'
import { ButtonPocketCategory } from '../../ui/Buttons/ButtonPocketCategory'
import { usePocketsStore } from '@/store/usePocketsStore'

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
const {pockets,toggleModalOpen,showNewPocket} = usePocketsStore();

const createNewPocketHandler = () =>{
  toggleModalOpen()
  showNewPocket()
}
    return <div className='flex flex-col gap-5'>
<h2>Pockets</h2>
{pockets.map((pocket,index)=><ButtonPocketCategory onClick={()=>null} {...pocket} active={true} key={index}/>)}
<ButtonCreateNewPocket onClick={createNewPocketHandler}/>
        </div>
}