import {CreatePocketFormFields} from '@/components/Forms/Pocket/CreatePocketForm';
import {UseFormReset, UseFormSetError} from 'react-hook-form';

export const createPocketAPI = async (
  name: string,
  emoji: string,
  setError: UseFormSetError<CreatePocketFormFields>,
  reset: UseFormReset<CreatePocketFormFields>,
  getAllPockets: () => void,
  hideNewPocket: () => void
) => {
  try {
    const res = await fetch('/api/pockets/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, emoji}),
    });

    if (!res.ok) {
      setError('root', {message: 'Failed to create pocket'});
      return;
    }
    reset();
    getAllPockets();
    hideNewPocket();
  } catch (error) {
    console.log(error);
    setError('root', {message: 'Something went wrong'});
  }
};

export const deletePocketAPI = async (selectedPocket: {
  _id: string;
  name: string;
  emoji: string;
}) => {
  try {
    const res = await fetch('/api/pockets/deletePocket', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pocketId: selectedPocket._id,
      }),
    });
    const data: {success: boolean} = await res.json();
    if (!data.success) return;
  } catch (err) {
    console.error('Błąd pobierania tasks', err);
  }
};
