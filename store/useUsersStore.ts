import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

export type User = {
  _id: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar: string;
};

type State = {
  avatar: string;
  _id: string;
  firstName: string;
  lastName: string;
  modalOpen: boolean;
};

type Actions = {
  setUserData: (data: {
    avatar: string;
    _id: string;
    firstName: string;
    lastName: string;
  }) => void;
  toggleModalOpen: () => void;
  updateAvatar: (aavatar: string) => void;
};

export const useUsersStore = create<State & Actions>()(
  immer((set) => ({
    prevAvatar: null,
    avatar: '',
    _id: '',
    firstName: '',
    lastName: '',
    modalOpen: false,
    setUserData: (data: {
      avatar: string;
      _id: string;
      firstName: string;
      lastName: string;
    }) => {
      set((state) => {
        state.avatar = data.avatar;
        state._id = data._id;
        state.firstName = data.firstName;
        state.lastName = data.lastName;
      });
    },
    toggleModalOpen: () =>
      set((state) => {
        state.modalOpen = !state.modalOpen;
      }),
    updateAvatar: (avatar) =>
      set((state) => {
        state.avatar = avatar;
      }),
  }))
);
