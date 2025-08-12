'use client'
import ArrowIcon from '@/public/assets/icons/fluent_arrow-left-28-filled.svg'
import { EmojiKeyboard } from '../EmojiKeyboard'
import { useState } from 'react'
import { usePocketsStore } from '@/store/usePocketsStore'

const INITIAL_POCKET_FORM = {
    emoji:'1f929',
    name:'',
    error:false
}

export const AddPocket = () =>{
const {hideNewPocket,getAllPockets} = usePocketsStore()
const [pocketForm,setPocketForm]=useState(INITIAL_POCKET_FORM)

const setEmojiHandler = (emoji:string) =>{
setPocketForm((prevState)=>({...prevState,emoji:emoji}))
}

const nameHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
setPocketForm((prevState)=>({...prevState,name:e.target.value}))
} 

const onSubmitHandler = async(e:React.FormEvent) =>{
e.preventDefault();
if(pocketForm.name.length===0){
    setPocketForm((prevState)=>({...prevState,error:true}))
    return
}
 const res= await fetch('/api/pockets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name:pocketForm.name,emoji:pocketForm.emoji}),
    });
    if(!res.ok){
    
      setPocketForm((prevState)=>({...prevState,error:true}))
     setTimeout(()=>{
setPocketForm(INITIAL_POCKET_FORM)
     },2000)
    } 
    getAllPockets();
    hideNewPocket();
}
    return <div className='flex flex-col mb-[77px] w-[399px]  bg-white rounded-[19px] gap-4'>
            <div className='flex flex-col gap-2.5 p-2.5'>
<button onClick={hideNewPocket} className='border-0 flex flex-row gap-1.5 p-1.5 font-medium text-[14px] text-[#6529FE] cursor-pointer'>
    <img src={ArrowIcon.src} alt='arrow icon'/>
    Go Back
</button>
<form onSubmit={onSubmitHandler} className={`flex ${pocketForm.error?'border-[1px] border-red-600':'border-0'} flex-row w-full h-[40px] py-[3px] pr-[3px] pl-3 bg-gray-50 gap-3 rounded-[10px] items-center`}>
<img src={`/joypixels/${pocketForm.emoji}.png`} className='w-[24px] h-[24px]'/>
<input onChange={(e)=>nameHandler(e)} value={pocketForm.name} type='text' className='w-full stroke-0 outline-none text-[14px] font-normal'/>
<button className='flex items-center justify-center py-[10px] px-[12px] h-full bg-gray-100 rounded-[8px] text-[14px] font-semibold cursor-pointer'>Create</button>
</form>
            </div>
            <div className='flex flex-col gap-[8px]'>
                <span className='text-[14px] font-medium p-2.5'>Select emoji</span>
        <EmojiKeyboard onClick={setEmojiHandler}/>
        </div>
        </div>
}