'use client';
import {Pocket, usePocketsStore} from '@/store/usePocketsStore';
import {useTasksStore} from '@/store/useTasksStore';

export const ButtonSelectPocket = ({emoji, name, tasks, _id}: Pocket) => {
  const {selectedPocket, setSelectedPocket} = usePocketsStore();
  const {getAllTasks} = useTasksStore();

  const onClickHandler = () => {
    setSelectedPocket(_id);
    getAllTasks(_id);
  };

  return (
    <button
      onClick={onClickHandler}
      className={`flex flex-row sm:w-full w-fit h-min py-1.5 px-2 justify-between ${selectedPocket._id === _id && 'bg-[#6529FE]'} items-center rounded-[6px] cursor-pointer`}
    >
      <div className={`flex flex-row gap-4  items-center`}>
        <img className="w-[16px] h-[16px]" src={`/joypixels/${emoji}.png`} alt={`emoji ${emoji}`}/>
        <span
          className={`${selectedPocket._id === _id ? 'text-white' : 'black'} sm:block hidden font-medium`}
        >
          {name}
        </span>
      </div>
      <span
        className={`w-[24px] h-[24px] ${selectedPocket._id === _id ? 'bg-[#754EFF]' : 'bg-gray-50'} sm:block hidden rounded-[4px] text-[14px] font-normal ${selectedPocket._id === _id ? 'text-white' : 'text-[#595959]'} align-middle text-center`}
      >
        {tasks.length}
      </span>
    </button>
  );
};
