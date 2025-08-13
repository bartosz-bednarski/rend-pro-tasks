'use client';
import {ButtonCreateNewPocket} from '../../ui/Buttons/ButtonCreateNewPocket';
import {ButtonSelectPocket} from '../../ui/Buttons/ButtonSelectPocket';
import {usePocketsStore} from '@/store/usePocketsStore';

export const Pockets = () => {
  const {pockets, toggleModalOpen, showNewPocket} = usePocketsStore();

  const createNewPocketHandler = () => {
    toggleModalOpen();
    showNewPocket();
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="sm:flex hidden">Pockets</h2>
      {pockets.map((pocket, index) => (
        <ButtonSelectPocket {...pocket} key={index} />
      ))}
      <ButtonCreateNewPocket
        onClick={createNewPocketHandler}
        mobilePlus={true}
      />
    </div>
  );
};
