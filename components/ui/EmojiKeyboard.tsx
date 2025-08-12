'use client'
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });
import {Categories} from 'emoji-picker-react'
import './keyboardStyles.css'
export const EmojiKeyboard = () =>{
    return <><EmojiPicker  skinTonesDisabled style={{width:399}}  searchDisabled  lazyLoadEmojis={true} categories={[
        {
          category: Categories.SMILEYS_PEOPLE,
          name: "Smileys People"
        },
        {
          category: Categories.ANIMALS_NATURE,
          name: "Animals & Nature"
        },
        {
          category: Categories.FOOD_DRINK,
          name: "Food & Drink"
        },
    ]}/>
    </>
}