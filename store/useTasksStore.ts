import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  tasks: Task[];
  incompletedTasks: Task[];
  showIncompletedTasks: boolean;
};
export type Task = {
  createdAt: string;
  description: string;
  isCompleted: boolean;
  pocket: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

type Actions = {
  getAllTasks: (pocketId: string) => void;
  toggleShowCompletedTasks: () => void;
  resetActiveTasks: () => void;
};

export const useTasksStore = create<State & Actions>()(
  immer((set) => ({
    tasks: [],
    incompletedTasks: [],
    showIncompletedTasks: false,
    getAllTasks: async (pocketId) => {
      try {
        const res = await fetch('/api/tasks/getAll', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({pocketId}),
        });
        const data: {success: boolean; data: Task[]} = await res.json();
        if (!data.success) return;
        set((state) => {
          state.tasks = data.data;
          state.incompletedTasks = data.data.filter(
            (task) => task.isCompleted === false
          );
        });
      } catch (err) {
        console.error('Błąd pobierania tasks', err);
      }
    },
    toggleShowCompletedTasks: () => {
      set((state) => {
        state.showIncompletedTasks = !state.showIncompletedTasks;
      });
    },
    resetActiveTasks: () => {
      set((state) => {
        state.tasks = [];
        state.incompletedTasks = [];
        state.showIncompletedTasks = false;
      });
    },
  }))
);
