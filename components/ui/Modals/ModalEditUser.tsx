'use client';
import React, {useEffect, useState} from 'react';
import ArrowIcon from '@/public/assets/icons/fluent_arrow-left-28-filled.svg';
import {motion} from 'motion/react';
import {User, useUsersStore} from '@/store/useUsersStore';
import z from 'zod';
import {InputTextForm} from '../Inputs/InputTextForm';
import {InputFileFormEditUser} from '../Inputs/InputFileFormEditUser';
import {useRouter} from 'next/navigation';

const logoutUserAPI = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  });
};

const getUserData = async (
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

function base64ToFile(base64: string, filename: string) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

const setAvatarAPI = async (formData: FormData) => {
  const res = await fetch('/api/users/putAvatar', {
    method: 'POST',
    body: formData,
  });
  const data: {success: boolean; data: User} = await res.json();
  if (!data.success) return;
  return data;
};

type EditUserFormType = {
  firstName: {
    value: string;
    success: boolean;
    error: string;
  };
  lastName: {
    value: string;
    success: boolean;
    error: string;
  };
  avatar: {
    value: string;
    success: boolean;
    error: string;
  };
};
const registerMainViewSchema = z.object({
  firstName: z.string().min(1, 'First Name must be at least 1 characters long'),
  lastName: z.string().min(1, 'Last Name must be at least 1 characters long'),
  avatar: z.string().min(10, 'Please upload your avatar'),
});

export const ModalEditUser: React.FC = () => {
  const router = useRouter();
  const {modalOpen, avatar, toggleModalOpen, firstName, lastName, setUserData} =
    useUsersStore();
  const INITIAL_EDIT_USER_FORM = {
    firstName: {
      value: '',
      success: true,
      error: '',
    },
    lastName: {
      value: '',
      success: true,
      error: '',
    },
    avatar: {
      value: '',
      success: true,
      error: '',
    },
  };
  const [editUserForm, setEditUserForm] = useState<EditUserFormType>(
    INITIAL_EDIT_USER_FORM
  );
  useEffect(() => {
    if (modalOpen) {
      setEditUserForm({
        firstName: {value: firstName, success: true, error: ''},
        lastName: {value: lastName, success: true, error: ''},
        avatar: {value: avatar, success: true, error: ''},
      });
    }
  }, [modalOpen, firstName, lastName, avatar]);
  if (!modalOpen) {
    return null;
  }

  const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserForm((prevState: EditUserFormType) => ({
      ...prevState,
      firstName: {...prevState.firstName, value: e.target.value},
    }));
  };

  const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserForm((prevState: EditUserFormType) => ({
      ...prevState,
      lastName: {...prevState.lastName, value: e.target.value},
    }));
  };

  const avatarHandler = (avatar: string) => {
    setEditUserForm((prevState: EditUserFormType) => ({
      ...prevState,
      avatar: {...prevState.avatar, value: avatar},
    }));
  };

  const logoutHandler = () => {
    router.push('/');
    router.refresh();
    logoutUserAPI();
  };
  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditUserForm({...INITIAL_EDIT_USER_FORM});
    const result = registerMainViewSchema.safeParse({
      firstName: editUserForm.firstName.value,
      lastName: editUserForm.lastName.value,
      avatar: editUserForm.avatar.value,
    });

    if (!result.success) {
      const newState = {...editUserForm};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'firstName') {
          newState.firstName.success = false;
          newState.firstName.error = err.message;
        }
        if (err.path[0] === 'lastName') {
          newState.lastName.success = false;
          newState.lastName.error = err.message;
        }
        if (err.path[0] === 'avatar') {
          newState.avatar.success = false;
          newState.avatar.error = err.message;
        }
      });
      setEditUserForm(newState);
      return;
    }

    const res = await fetch('/api/users/updateUser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        firstName: editUserForm.firstName.value,
        lastName: editUserForm.lastName.value,
      }),
    });

    if (!res.ok) {
      setEditUserForm(INITIAL_EDIT_USER_FORM);
      return;
    }
    if (editUserForm.avatar.value !== avatar) {
      const file = base64ToFile(editUserForm.avatar.value, 'avatar.png');
      const formData = new FormData();
      formData.append('file', file);
      setAvatarAPI(formData);
    }

    getUserData(setUserData);
    toggleModalOpen();
  };
  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 0.7}}
        exit={{opacity: 0}}
        className="fixed left-0 top-0 flex z-40  w-screen h-full backdrop-blur-xs bg-black opacity-50"
      ></motion.div>
      <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-screen">
        <div className="flex flex-col gap-3 bg-white sm:w-[586px] w-[90%] rounded-[26px] py-[22px] px-[31px]">
          <button
            onClick={toggleModalOpen}
            className="border-0 flex flex-row gap-1.5 p-1.5 font-medium text-[14px] text-[#6529FE] cursor-pointer"
          >
            <img src={ArrowIcon.src} alt="arrow icon" />
            Go Back
          </button>
          <form onSubmit={submitFormHandler} className="flex flex-col gap-2 ">
            <InputTextForm
              value={editUserForm.firstName.value}
              onChange={firstNameHandler}
              success={editUserForm.firstName.success}
              error={editUserForm.firstName.error}
              placeholder="First Name"
            />
            <InputTextForm
              value={editUserForm.lastName.value}
              onChange={lastNameHandler}
              success={editUserForm.lastName.success}
              error={editUserForm.lastName.error}
              placeholder="Last Name"
            />
            <InputFileFormEditUser
              success={editUserForm.avatar.success}
              error={editUserForm.avatar.error}
              avatarDefault={avatar}
              avatarHandler={avatarHandler}
            />

            <button
              type="submit"
              className="py-2.5 px-4 bg-purple-600 text-white rounded-lg w-full h-min cursor-pointer"
            >
              Update
            </button>
          </form>
          <button
            onClick={logoutHandler}
            className="py-2.5 px-4 bg-red-500 text-white rounded-lg w-full h-min cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
