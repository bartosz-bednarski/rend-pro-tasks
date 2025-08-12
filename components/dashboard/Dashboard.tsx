'use client'

import { EmojiKeyboard } from '../ui/EmojiKeyboard';
import { Sidebar } from './Sidebar/Sidebar';

export const Dashboard = () =>{

        

    return <main className='flex flex-row p-2.5 bg-gray-50 w-full h-full min-h-[100vh]'>
      <Sidebar/>
      <EmojiKeyboard/>
      </main>
}