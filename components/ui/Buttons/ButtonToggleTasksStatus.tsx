'use client';

import {useTasksStore} from '@/store/useTasksStore';

export const ButtonToggleTasksStatus = () => {
  const {showIncompletedTasks, toggleShowCompletedTasks} = useTasksStore();

  return (
    <button
      onClick={toggleShowCompletedTasks}
      className="h-min py-2.5 px-3 rounded-[8px] bg-white font-semibold text-[14px] text-gray-900 cursor-pointer hover:bg-[#EAE7FF] hover:text-[#754EFF]"
    >
      {showIncompletedTasks ? 'Hide completed' : 'Show completed'}
    </button>
  );
};
