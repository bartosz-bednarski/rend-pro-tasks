'use client'
import AvatarDefault from '@/public/assets/images/avatar_default.png'
import { User, useUsersStore } from '@/store/useUsersStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

 const logoutUserAPI = async()=>{
     await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }); 
        }

 const getUserData = async(setUserData:(data:{ avatar:string,
   _id:string,
   firstName:string,
   lastName:string})=>void)=>{
     try {
            const res = await fetch('/api/users/getUser');
            const data: {success:boolean,data:User} = await res.json();
            if(!data.success)return;
            const user = {
              avatar:data.data.avatar,
              _id:data.data._id,
              firstName:data.data.firstName,
              lastName:data.data.lastName
            }
            setUserData(user)
          } catch (err) {
            console.error('Błąd pobierania tasks', err);
          }
        }
export const ButtonLogOut = () =>{
  const {avatar,firstName,lastName,setUserData} = useUsersStore()
  const router = useRouter()
useEffect(()=>{
  if(avatar===''){
getUserData(setUserData)

  }
},[])
const logoutHandler = () =>{
  logoutUserAPI()
  router.push('/')
  router.refresh()
}
    

        return <button onClick={logoutHandler} className='flex flex-row gap-3 min-h-8 cursor-pointer'>
          <img className='w-[38px] h-[38px] rounded-full' src={`${avatar!==''?avatar:AvatarDefault}`} alt='user avatar'/>
        <div className='sm:flex hidden flex-col gap-0.5 font-medium '>
          <span className='text-[14px] text-black'>{firstName} {lastName}</span>
<span className='text-[12px] text-gray-600 text-left'>Log out</span>
        </div>
        </button>
}