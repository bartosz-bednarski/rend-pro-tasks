'use client'
import UserIcon from '@/public/assets/icons/ph_user.svg'
import PasswordIcon from '@/public/assets/icons/carbon_password.svg'
import Link from 'next/link'

export const  LoginForm = () =>{

    const loginFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login:"bb8",password:"Test10082025"}),
    }); 
    return data
    }
    // loginFNC()
     const logoutFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login:"bb8",password:"Test10082025"}),
    }); 
    return data
    }
    logoutFNC()
    
    return <div className='flex flex-col gap-8 w-full sm:w-[520px] shrink-0 py-10 px-5 sm:py-44 sm:px-14  '>
      <h1 className='font-bold'>Login</h1>
      <form className='flex flex-col gap-2.5'>
        <div className='w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg'>
          <img className='w-5 h-5' src={UserIcon.src}/>
<input className='w-full border-0 outline-none size-4 placeholder:gray-800 ' placeholder='Username'/>
        </div>
 <div className='w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg'>
          <img className='w-5 h-5' src={PasswordIcon.src}/>
<input className='w-full border-0 outline-none size-4 placeholder:gray-800 ' placeholder='Password'/>
        </div>
<button className='py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min'>Login me</button>
    </form>
    <p className='font-normal'>Don’t have account? <Link className='text-purple-600' href="/">Register now</Link></p>
      </div>
}