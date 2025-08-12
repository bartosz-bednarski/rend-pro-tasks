'use client'
import { RegisterForm } from './RegisterForm'
import { useState } from 'react'
import { RegisterMainViewForm } from './RegisterMainView'
import { useRouter } from 'next/navigation'

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

const INITIAL_STATUS_FORM:FormStatusType = {
    form1Ok:false,
    form2Ok:false,
}

export const RegisterLayout = () =>{

const router = useRouter()


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

 const res= await fetch('/api/auth/register', {
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
router.push('/dashboard')
    }
    return <>
    {!formsStatus.form1Ok&&<RegisterForm fetchError={fetchError} onSuccess={form1SuccessHandler}/>}
    {formsStatus.form1Ok&&<RegisterMainViewForm  onSuccess={form2SuccessHandler}/>}
    </>
   
}