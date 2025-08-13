'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import {Categories} from 'emoji-picker-react';
import './keyboardStyles.css';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {ssr: false});

interface EmojiKeyboardProps {
  onClick: (emoji: string) => void;
}
export const EmojiKeyboard:React.FC<EmojiKeyboardProps> = ({onClick}) => {
  return (
    <>
      <EmojiPicker
        skinTonesDisabled
        style={{width: '100%', height: 258, border: 0}}
        searchDisabled
        lazyLoadEmojis={true}
        categories={[
          {
            category: Categories.SMILEYS_PEOPLE,
            name: 'Smileys People',
          },
          {
            category: Categories.ANIMALS_NATURE,
            name: 'Animals & Nature',
          },
          {
            category: Categories.FOOD_DRINK,
            name: 'Food & Drink',
          },
          {
            category: Categories.TRAVEL_PLACES,
            name: 'Travel & Places',
          },
          {
            category: Categories.ACTIVITIES,
            name: 'Activities',
          },
          {
            category: Categories.OBJECTS,
            name: 'Objects',
          },
          {
            category: Categories.SYMBOLS,
            name: 'Symbols',
          },
          {
            category: Categories.FLAGS,
            name: 'Flags',
          },
        ]}
        onEmojiClick={(emojiData) => onClick(emojiData.unified)}
      />
    </>
  );
};
