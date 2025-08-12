'use client'
import AvatarDefault from '@/public/assets/images/avatar_default.png'
import { useEffect, useState } from 'react';
export const ButtonLogOut = () =>{
const [avatar,setAvatar] = useState<string|null>(null)
useEffect(()=>{
     setAvatar(localStorage.getItem("avatar"))
},[])

     const logoutUserAPI = async()=>{
     const data= await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }); 
        }

        return <button onClick={logoutUserAPI } className='flex flex-row gap-3 min-h-8 cursor-pointer'>
          <img className='w-[38px] h-[38px] rounded-full' src={`${avatar?avatar:AvatarDefault}`} alt='user avatar'/>
        <div className='flex flex-col gap-0.5 font-medium '>
          <span className='text-[14px] text-black'>Bartosz Bednarski</span>
<span className='text-[12px] text-gray-600 text-left'>Log out</span>
        </div>
        </button>
}