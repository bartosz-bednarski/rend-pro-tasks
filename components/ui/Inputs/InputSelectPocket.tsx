'use client';
import React from 'react';
import {Pocket} from '@/store/usePocketsStore';

interface InputSelectPocketProps extends Pocket {
  selected: string;
  onChange: (_id: string) => void;
}

export const InputSelectPocket: React.FC<InputSelectPocketProps> = ({
  selected,
  _id,
  emoji,
  name,
  onChange,
  tasks,
}) => {
  return (
    <label
      key={_id}
      className={`flex flex-row w-full py-1.5 px-2 justify-between ${selected === _id && 'bg-[#6529FE]'} items-center rounded-[6px] cursor-pointer`}
    >
      <div
        className={`flex flex-row gap-4 ${selected === _id ? 'text-white' : 'black'} font-medium items-center`}
      >
        <img className="w-[16px] h-[16px]" src={`/joypixels/${emoji}.png`} />
        {name}
      </div>
      <input
        type="radio"
        name="_id"
        value={_id}
        checked={selected === _id}
        onChange={() => onChange(_id)}
        className="hidden"
      />
      <span
        className={`w-[24px] h-[24px] ${selected === _id ? 'bg-[#754EFF]' : 'bg-gray-50'} rounded-[4px] text-[14px] font-normal ${selected === _id ? 'text-white' : 'text-[#595959]'} align-middle text-center`}
      >
        {tasks.length}
      </span>
    </label>
  );
};
