'use client';
import DotsIcon from '@/public/assets/icons/mage_dots.svg';
import DotsWhiteIcon from '@/public/assets/icons/mage_dots_white.svg';
import TrashIcon from '@/public/assets/icons/iconoir_trash.svg';
import {usePocketsStore} from '@/store/usePocketsStore';
import {Task, useTasksStore} from '@/store/useTasksStore';
import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';

export const TasksItem = ({description, isCompleted, _id}: Task) => {
  const {selectedPocket, getAllPockets} = usePocketsStore();
  const {getAllTasks} = useTasksStore();

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const showDeleteButtonHandler = () => {
    setShowDeleteButton((prevState) => !prevState);
  };

  const completedStatusHandler = async () => {
    try {
      const res = await fetch('/api/tasks/toggleTaskStatus', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          pocketId: selectedPocket._id,
          taskId: _id,
          isCompleted: !isCompleted,
        }),
      });
      const data: {success: boolean; data: []} = await res.json();

      if (!data.success) return;
    } catch (err) {
      console.error('Błąd pobierania tasks', err);
    }
    getAllTasks(selectedPocket._id);
  };
  const deleteTaskHandler = async () => {
    try {
      const res = await fetch('/api/tasks/deleteTask', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          pocketId: selectedPocket._id,
          taskId: _id,
          isCompleted: !isCompleted,
        }),
      });
      const data: {success: boolean; data: []} = await res.json();
      if (!data.success) return;
    } catch (err) {
      console.error('Błąd pobierania tasks', err);
    }
    getAllTasks(selectedPocket._id);
    getAllPockets();
  };

  return (
    <div className="flex flex-col gap-1.5 items-end group">
      <div
        className={`transition-all flex flex-row justify-between py-[4px] pl-[8px] pr-[4px] w-full ${isCompleted ? 'bg-[#6529FE]' : 'bg-white group-hover:bg-gray-100'} rounded-[6px] cursor-pointer`}
      >
        <div
          className={`flex flex-row gap-[10px] text-[14px] font-normal ${isCompleted ? 'text-white line-through' : 'text-black'} items-center`}
        >
          <button
            onClick={completedStatusHandler}
            className={`w-[24px] h-[24px] border-[1px] ${isCompleted ? 'border-[#6126EB] bg-[#9781FF]' : 'border-gray-200 '} rounded-[6px] cursor-pointer`}
          ></button>
          {description}
        </div>
        <button
          onClick={showDeleteButtonHandler}
          className={`flex items-center justify-center ${isCompleted ? 'bg-[#754EFF] hover:bg-[#9781FF]' : 'bg-gray-50 group-hover:bg-white'} rounded-[4px] w-[30px] h-[30px] cursor-pointer`}
        >
          <img
            src={isCompleted ? DotsWhiteIcon.src : DotsIcon.src}
            className="w-[14px] h-[14px]"
            alt="dots icon"
          />
        </button>
      </div>
      <AnimatePresence>
        {showDeleteButton && (
          <motion.button
            exit={{opacity: 0}}
            onClick={deleteTaskHandler}
            className="h-min sm:w-fit w-full items-center justify-center py-2.5 px-3 flex flex-row gap-[10px] bg-white rounded-[6px] drop-shadow-black cursor-pointer"
          >
            <img
              src={TrashIcon.src}
              className="w-[14px] h-[14px]"
              alt="dots icon"
            />{' '}
            <span className="text-[14px] text-[#C54D4D] font-normal">
              Delete
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
