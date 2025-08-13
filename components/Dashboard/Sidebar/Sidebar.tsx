'use client';
import React from 'react';
import {ButtonShowProfile} from '../../ui/Buttons/ButtonShowProfile';
import {Pockets} from './Pockets';

export const Sidebar: React.FC = () => {
  return (
    <div className="shrink-0 flex flex-col bg-white rounded-[14px] sm:w-[274px] sm:py-[40px] pt:[32px] pb:[8px] sm:px-[24px] px-[6px] justify-between">
      <Pockets />
      <ButtonShowProfile />
    </div>
  );
};
