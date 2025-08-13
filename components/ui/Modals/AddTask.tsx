'use client';

import {ButtonCreateNewPocket} from '@/components/ui/Buttons/ButtonCreateNewPocket';
import {usePocketsStore} from '@/store/usePocketsStore';
import {InputSelectPocket} from '../Inputs/InputSelectPocket';
import {useState} from 'react';
import {useTasksStore} from '@/store/useTasksStore';
import {AnimatePresence, motion} from 'motion/react';
const INITIAL_TASK_FORM = {
  pocketId: '',
  description: '',
  errorPocket: false,
  errorDescription: false,
};

export const AddTask = () => {
  const {pockets, showNewPocket, getAllPockets, selectedPocket} =
    usePocketsStore();
  const {getAllTasks} = useTasksStore();

  const [addTaskForm, setAddTaskForm] = useState({
    pocketId: '',
    description: '',
    errorPocket: false,
    errorDescription: false,
  });

  const selectPocketHandler = (_id: string) => {
    setAddTaskForm((prevState) => ({...prevState, pocketId: _id}));
  };
  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTaskForm((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addTaskForm.pocketId === '') {
      setAddTaskForm((prevState) => ({...prevState, errorPocket: true}));
      return;
    }
    if (addTaskForm.pocketId !== '') {
      setAddTaskForm((prevState) => ({...prevState, errorPocket: false}));
    }
    if (addTaskForm.description.length === 0) {
      setAddTaskForm((prevState) => ({...prevState, errorDescription: true}));
      return;
    }
    if (addTaskForm.description.length > 0) {
      setAddTaskForm((prevState) => ({...prevState, errorDescription: false}));
    }
    const res = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        description: addTaskForm.description,
        pocketId: addTaskForm.pocketId,
      }),
    });
    if (!res.ok) {
      setAddTaskForm((prevState) => ({
        ...prevState,
        errorPocket: true,
        errorDescription: true,
      }));
      setTimeout(() => {
        setAddTaskForm(INITIAL_TASK_FORM);
      }, 2000);
    }
    getAllPockets();
    if (selectedPocket._id !== '') {
      getAllTasks(selectedPocket._id);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0}}
        className="flex flex-col mb-[77px] w-[399px] p-2.5 bg-white rounded-[19px] gap-4"
      >
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2.5">
          <div
            className={`${addTaskForm.errorDescription ? 'border-[1px] border-red-600' : 'border-0'} flex flex-row w-full h-[44px] py-[3px] pr-[3px] pl-3 bg-gray-50 gap-3 rounded-[10px] items-center`}
          >
            <span className="w-[24px] h-[24px] rounded-[6px] bg-white block shrink-0 border-[1px] border-gray-200"></span>
            <input
              onChange={descriptionHandler}
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
          <div className="flex flex-col gap-2">
            <span className="px-1.5 text-[14px] font-medium">
              Select pocket
            </span>
            <div
              className={`${addTaskForm.errorPocket ? 'border-[1px] border-red-600' : 'border-0'} flex flex-col gap-1.5`}
            >
              {pockets.map((pocket) => (
                <InputSelectPocket
                  {...pocket}
                  selected={addTaskForm.pocketId}
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
