'use client';
import React from 'react';
interface InputFormProps {
  icon?: HTMLImageElement;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  success: boolean;
  error: string;
  placeholder: string;
}

export const InputTextForm: React.FC<InputFormProps> = ({
  value,
  icon,
  onChange,
  success,
  error,
  placeholder,
}) => {
  return (
    <>
      <div className="w-full h-10 flex flex-row items-center justify-center bg-gray-50 py-2.5 px-3 gap-3 rounded-lg">
        {icon && <img className="w-5 h-5" src={icon.src} alt="emoji" />}
        <input
          onChange={(e) => onChange(e)}
          value={value}
          className="w-full border-0 outline-none size-4 placeholder-gray-800 "
          placeholder={placeholder}
        />
      </div>
      {!success && <p className="text-red-500 text-sm">{error}</p>}{' '}
    </>
  );
};
