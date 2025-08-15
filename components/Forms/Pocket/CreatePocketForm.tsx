'use client';
import React from 'react';
import ArrowIcon from '@/public/assets/icons/fluent_arrow-left-28-filled.svg';
import {EmojiKeyboard} from '../../ui/EmojiKeyboard';
import {useState} from 'react';
import {usePocketsStore} from '@/store/usePocketsStore';
import z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createPocketAPI} from '@/lib/api/pockets';

const schema = z.object({
  emoji: z.string().min(3),
  name: z.string().min(1, 'Pocket must be at least 1 characters long'),
});

export type CreatePocketFormFields = z.infer<typeof schema>;

export const CreatePocketForm: React.FC = () => {
  const {hideNewPocket, getAllPockets} = usePocketsStore();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: {errors},
  } = useForm<CreatePocketFormFields>({
    defaultValues: {
      emoji: '1f929',
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const emojiForm = watch('emoji');

  const setEmojiHandler = (emoji: string) => {
    setValue('emoji', emoji);
  };

  const onSubmit: SubmitHandler<CreatePocketFormFields> = async (data) => {
    await createPocketAPI(
      data.name,
      data.emoji,
      setError,
      reset,
      getAllPockets,
      hideNewPocket
    );
  };
  return (
    <div className="flex flex-col mb-[77px] sm:w-[399px] w-11/12  bg-white rounded-[19px] gap-4">
      <div className="flex flex-col gap-2.5 p-2.5">
        <button
          onClick={hideNewPocket}
          className="border-0 flex flex-row gap-1.5 p-1.5 font-medium text-[14px] text-[#6529FE] cursor-pointer"
        >
          <img src={ArrowIcon.src} alt="arrow icon" />
          Go Back
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex border-0 flex-row w-full h-[40px] py-[3px] pr-[3px] pl-3 bg-gray-50 gap-3 rounded-[10px] items-center"
        >
          <img
            src={`/joypixels/${emojiForm}.png`}
            className="w-[24px] h-[24px]"
            alt={`emoji ${emojiForm}`}
          />
          <input
            {...register('name')}
            type="text"
            className="w-full stroke-0 outline-none text-[14px] font-normal"
          />
          <button className="flex items-center justify-center py-[10px] px-[12px] h-full bg-gray-100 rounded-[8px] text-[14px] font-semibold cursor-pointer">
            Create
          </button>
        </form>
        {errors.emoji && (
          <p className="text-red-500 text-sm">{errors.emoji.message}</p>
        )}
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        {errors.root && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[14px] font-medium p-2.5">Select emoji</span>
        <EmojiKeyboard onClick={setEmojiHandler} />
      </div>
    </div>
  );
};
