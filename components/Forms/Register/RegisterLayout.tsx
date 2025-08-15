'use client';
import React from 'react';
import {useState} from 'react';
import {RegisterMainViewForm} from './RegisterMainView';
import {useRouter} from 'next/navigation';
import {useUsersStore} from '@/store/useUsersStore';
import { RegisterForm } from './RegisterForm';
import { putAvatarAPI } from '@/lib/api/users';
import { registerUserAPI } from '@/lib/api/auth';



interface RegisterFormType {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar:undefined|File;
}

const INITIAL_FORM: RegisterFormType = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  avatar:undefined
};

interface FormStatusType {
  form1Ok: boolean;
  form2Ok: boolean;
}

const INITIAL_STATUS_FORM: FormStatusType = {
  form1Ok: false,
  form2Ok: false,
};

export const RegisterLayout: React.FC = () => {
  const {setUserData} = useUsersStore();
  
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  const [formsStatus, setFormsStatus] = useState(INITIAL_STATUS_FORM);
  const [fetchError, setFetchError] = useState(false);

  const form1SuccessHandler = (login: string, password: string) => {
    setForm((prevState) => ({...prevState, login, password}));
    setFormsStatus((prevState) => ({...prevState, form1Ok: true}));
  };

  const resetFormHandler = ()=>{
    setForm(INITIAL_FORM);
  }
  const resetFormsStatusHandler = () =>{
    setFormsStatus(INITIAL_STATUS_FORM);
  }
  const onSubmit = async (firstName: string, lastName: string,avatar:File) => {
    setForm((prevState) => ({...prevState, firstName, lastName,avatar}));
    setFormsStatus((prevState) => ({...prevState, form1Ok: true}));

await registerUserAPI(form.login,form.password,firstName,lastName,setFetchError,resetFormHandler,resetFormsStatusHandler,router);

    if(!avatar)return;
    const formData = new FormData();
    formData.append('file', avatar);

await putAvatarAPI(formData, setUserData);

setForm(INITIAL_FORM);
    setFormsStatus(INITIAL_STATUS_FORM);
    setFetchError(false);
    router.push('/dashboard');
  };
  if(!formsStatus.form1Ok){
    return <RegisterForm fetchError={fetchError} onSuccess={form1SuccessHandler} />
  }
  if(formsStatus.form1Ok){
    return <RegisterMainViewForm onSuccess={onSubmit} />
  }
};
