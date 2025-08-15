import {CreateTaskFormFields} from '@/components/Forms/Task/CreateTaskForm';
import {UseFormReset, UseFormSetError} from 'react-hook-form';

export const createTaskAPI = async (
  description: string,
  pocketId: string,
  setError: UseFormSetError<CreateTaskFormFields>,
  reset: UseFormReset<CreateTaskFormFields>,
  getAllPockets: () => void,
  getAllTasks: (selectedPocket: string) => void,
  toggleModalOpen: () => void,
  selectedPocket: {
    _id: string;
    name: string;
    emoji: string;
  }
) => {
  try {
    const res = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        description: description,
        pocketId: pocketId,
      }),
    });
    if (!res.ok) {
      setError('root', {message: 'Failed to create pocket'});
      return;
    }
    reset();
    getAllPockets();
    if (selectedPocket._id !== '') {
      getAllTasks(selectedPocket._id);
    }
    toggleModalOpen();
  } catch (error) {
    console.log(error);
    setError('root', {message: 'Something went wrong'});
  }
};

export const toggleTaskStatusAPI = async (
  selectedPocket: {
    _id: string;
    name: string;
    emoji: string;
  },
  _id: string,
  isCompleted: boolean
) => {
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
};

export const deleteTaskAPI = async (
  selectedPocket: {
    _id: string;
    name: string;
    emoji: string;
  },
  _id: string,
  isCompleted: boolean
) => {
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
    const data: {success: boolean} = await res.json();
    if (!data.success) return;
  } catch (err) {
    console.error('Błąd pobierania tasks', err);
  }
};
