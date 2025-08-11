'use client'
import LayoutImage from '@/public/assets/images/login_layout.png'
import { RegisterForm } from './RegisterForm'
import { useState } from 'react'
import { boolean } from 'zod'
import { RegisterMainViewForm } from './RegisterMainView'

interface RegisterFormType {
    login:string,
    password:string,
    firstName:string,
    lastName:string
}

interface FormStatusType {
   form1Ok:boolean,
    form2Ok:boolean,
}

const INITIAL_REGISTER_FORM:RegisterFormType = {
    login:'',
    password:'',
    firstName:'',
    lastName:''
}

const INITIAL_STATUS_FORM = {
    form1Ok:false,
    form2Ok:false,
}

export const RegisterLayout = () =>{
    const [form,setForm] = useState(INITIAL_REGISTER_FORM)
    const [formsStatus,setFormsStatus] = useState(INITIAL_STATUS_FORM)
const [fetchError,setFetchError] = useState(false)
    const form1SuccessHandler = (login:string,password:string) =>{
setForm((prevState)=>({...prevState,login,password}))
setFormsStatus((prevState)=>({...prevState,form1Ok:true}))
    }
     const form2SuccessHandler = async (firstName:string,lastName:string) =>{
setForm((prevState)=>({...prevState,firstName,lastName}))
setFormsStatus((prevState)=>({...prevState,form1Ok:true}))
 const res= await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login:form.login,password:form.password,firstName:firstName,lastName:lastName}),
    });
    if(!res.ok){
        setFetchError(true)
    setForm(INITIAL_REGISTER_FORM)
    setFormsStatus(INITIAL_STATUS_FORM)
    return   
    } 
      setForm(INITIAL_REGISTER_FORM)
    setFormsStatus(INITIAL_STATUS_FORM) 
    setFetchError(false)
    }
    return <>
    {!formsStatus.form1Ok&&<RegisterForm fetchError={fetchError} onSuccess={form1SuccessHandler}/>}
    {formsStatus.form1Ok&&<RegisterMainViewForm  onSuccess={form2SuccessHandler}/>}
    </>
   
}