import {UpdateUserFormFields} from '@/components/Forms/User/UpdateUserForm';
import {User} from '@/store/useUsersStore';
import {UseFormReset, UseFormSetError} from 'react-hook-form';

export const putAvatarAPI = async (
  formData: FormData,
  setUserData: (data: {
    avatar: string;
    _id: string;
    firstName: string;
    lastName: string;
  }) => void
) => {
  const res = await fetch('/api/users/putAvatar', {
    method: 'POST',
    body: formData,
  });
  const data: {success: boolean; data: User} = await res.json();
  if (!data.success) return;
  const dataMod = {
    avatar: data.data.avatar,
    _id: data.data._id,
    firstName: data.data.firstName,
    lastName: data.data.lastName,
  };
  setUserData(dataMod);
};

export const getUserDataAPI = async (
  setUserData: (data: {
    avatar: string;
    _id: string;
    firstName: string;
    lastName: string;
  }) => void
) => {
  try {
    const res = await fetch('/api/users/getUser');
    const data: {success: boolean; data: User} = await res.json();
    if (!data.success) return;
    const user = {
      avatar: data.data.avatar,
      _id: data.data._id,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
    };
    setUserData(user);
  } catch (err) {
    console.error('Błąd pobierania tasks', err);
  }
};

export const updateUserAPI = async (
  setError: UseFormSetError<UpdateUserFormFields>,
  reset: UseFormReset<UpdateUserFormFields>,
  data: {
    firstName: string;
    lastName: string;
  }
) => {
  try {
    const res = await fetch('/api/users/updateUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    });

    if (!res.ok) {
      reset();
      return;
    }
  } catch (error) {
    console.log(error);
    setError('root', {message: 'Something went wrong'});
  }
};
