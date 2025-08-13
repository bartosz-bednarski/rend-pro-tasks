'use client';
import React from 'react';
import {RegisterForm} from './RegisterForm';
import {useState} from 'react';
import {RegisterMainViewForm} from './RegisterMainView';
import {useRouter} from 'next/navigation';
import {User, useUsersStore} from '@/store/useUsersStore';

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

const setAvatarAPI = async (
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
  localStorage.removeItem('avatar');
};

interface RegisterFormType {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface FormStatusType {
  form1Ok: boolean;
  form2Ok: boolean;
}

const INITIAL_REGISTER_FORM: RegisterFormType = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
};

const INITIAL_STATUS_FORM: FormStatusType = {
  form1Ok: false,
  form2Ok: false,
};

export const RegisterLayout: React.FC = () => {
  const {setUserData} = useUsersStore();
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_REGISTER_FORM);
  const [formsStatus, setFormsStatus] = useState(INITIAL_STATUS_FORM);
  const [fetchError, setFetchError] = useState(false);

  const form1SuccessHandler = (login: string, password: string) => {
    setForm((prevState) => ({...prevState, login, password}));
    setFormsStatus((prevState) => ({...prevState, form1Ok: true}));
  };

  const form2SuccessHandler = async (firstName: string, lastName: string) => {
    setForm((prevState) => ({...prevState, firstName, lastName}));
    setFormsStatus((prevState) => ({...prevState, form1Ok: true}));

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: form.login,
        password: form.password,
        firstName: firstName,
        lastName: lastName,
      }),
    });

    if (!res.ok) {
      setFetchError(true);
      setForm(INITIAL_REGISTER_FORM);
      setFormsStatus(INITIAL_STATUS_FORM);
      return;
    }
    const localStorageAvatar = localStorage.getItem('avatar');

    if (!localStorageAvatar) return;

    const file = base64ToFile(localStorageAvatar, 'avatar.png');
    const formData = new FormData();
    formData.append('file', file);

    setAvatarAPI(formData, setUserData);

    setForm(INITIAL_REGISTER_FORM);
    setFormsStatus(INITIAL_STATUS_FORM);
    setFetchError(false);
    router.push('/dashboard');
  };
  return (
    <>
      {!formsStatus.form1Ok && (
        <RegisterForm fetchError={fetchError} onSuccess={form1SuccessHandler} />
      )}
      {formsStatus.form1Ok && (
        <RegisterMainViewForm onSuccess={form2SuccessHandler} />
      )}
    </>
  );
};
