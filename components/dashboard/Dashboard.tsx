'use client'

import { EmojiKeyboard } from '../ui/EmojiKeyboard';
import { Sidebar } from './sidebar/Sidebar';

export const Dashboard = () =>{

         const logoutFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }); 
    }

    return <main className='flex flex-row p-2.5 bg-gray-50 w-full h-full min-h-[100vh]'>
      <Sidebar/>
      <EmojiKeyboard/>
      <button onClick={logoutFNC}>LOGOUT</button></main>
}