import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  newPocketOpen: boolean;
  modalOpen: boolean;
  pockets: Pocket[];
  selectedPocket: {
    _id: string;
    name: string;
    emoji: string;
  };
};

type Actions = {
  showNewPocket: () => void;
  hideNewPocket: () => void;
  toggleModalOpen: () => void;
  getAllPockets: () => void;
  setSelectedPocket: (pocketId: string) => void;
};
export type Pocket = {
  createdAt: string;
  emoji: string;
  name: string;
  tasks: [];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

export const usePocketsStore = create<State & Actions>()(
  immer((set) => ({
    pockets: [],
    newPocketOpen: false,
    modalOpen: false,
    selectedPocket: {
      _id: '',
      name: '',
      emoji: '',
    },
    showNewPocket: () =>
      set((state) => {
        state.modalOpen = true;
        state.newPocketOpen = true;
      }),
    hideNewPocket: () =>
      set((state) => {
        state.newPocketOpen = false;
      }),

    toggleModalOpen: () =>
      set((state) => {
        state.modalOpen = !state.modalOpen;
      }),
    getAllPockets: async () => {
      try {
        const res = await fetch('/api/pockets/getAll');
        const data: {success: boolean; data: Pocket[]} = await res.json();
        console.log('Pockets Store', data);
        if (!data.success) return;
        set((state) => {
          state.pockets = data.data;
        });
      } catch (err) {
        console.error('Błąd pobierania tasks', err);
      }
    },
    setSelectedPocket: (pocketId) =>
      set((state) => {
        const filteredPocket = state.pockets.filter(
          (pocket) => pocket._id === pocketId
        );
        if (filteredPocket.length == 0) return;
        state.selectedPocket = {
          _id: pocketId,
          name: filteredPocket[0].name,
          emoji: filteredPocket[0].emoji,
        };
      }),
  }))
);
