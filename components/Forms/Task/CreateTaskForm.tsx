'use client';
import React from 'react';
import {ButtonCreateNewPocket} from '@/components/ui/Buttons/ButtonCreateNewPocket';
import {usePocketsStore} from '@/store/usePocketsStore';
import {useTasksStore} from '@/store/useTasksStore';
import {AnimatePresence, motion} from 'motion/react';
import z from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createTaskAPI} from '@/lib/api/tasks';
import {InputSelectPocket} from '@/components/ui/Inputs/InputSelectPocket';

const schema = z.object({
  pocketId: z.string().min(3, 'Select pocket'),
  description: z.string().min(1, 'Task must be at least 1 characters long'),
});
export type CreateTaskFormFields = z.infer<typeof schema>;
export const CreateTaskForm: React.FC = () => {
  const {
    pockets,
    showNewPocket,
    getAllPockets,
    selectedPocket,
    toggleModalOpen,
  } = usePocketsStore();
  const {getAllTasks} = useTasksStore();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: {errors},
  } = useForm<CreateTaskFormFields>({
    defaultValues: {
      pocketId: '',
      description: '',
    },
    resolver: zodResolver(schema),
  });

  const pocketIdForm = watch('pocketId');
  const selectPocketHandler = (_id: string) => {
    setValue('pocketId', _id);
  };
  const onSubmit: SubmitHandler<CreateTaskFormFields> = async (data) => {
    createTaskAPI(
      data.description,
      data.pocketId,
      setError,
      reset,
      getAllPockets,
      getAllTasks,
      toggleModalOpen,
      selectedPocket
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0}}
        className="flex flex-col mb-[77px] w-[399px] p-2.5 bg-white rounded-[19px] gap-4"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5"
        >
          <div className="border-0 flex flex-row w-full h-[44px] py-[3px] pr-[3px] pl-3 bg-gray-50 gap-3 rounded-[10px] items-center">
            <span className="w-[24px] h-[24px] rounded-[6px] bg-white block shrink-0 border-[1px] border-gray-200"></span>
            <input
              {...register('description')}
              type="text"
              placeholder="Create a new task"
              className="w-full stroke-0 outline-none text-[14px] font-normal"
            />
            <button
              type="submit"
              className="flex items-center justify-center py-[10px] px-[12px] bg-gray-100 rounded-[8px] text-[14px] font-semibold cursor-pointer"
            >
              Create
            </button>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
          {errors.pocketId && (
            <p className="text-red-500 text-sm">{errors.pocketId.message}</p>
          )}
          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}
          <div className="flex flex-col gap-2">
            <span className="px-1.5 text-[14px] font-medium">
              Select pocket
            </span>
            <div className="border-0 flex flex-col gap-1.5">
              {pockets.map((pocket) => (
                <InputSelectPocket
                  {...pocket}
                  selected={pocketIdForm}
                  onChange={selectPocketHandler}
                  key={pocket._id}
                />
              ))}
              <ButtonCreateNewPocket
                onClick={showNewPocket}
                mobilePlus={false}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
