'use client'
import LayoutImage from '@/public/assets/images/register_main_view_layout.jpg'
import z from 'zod'
import { useState } from 'react'
import { InputTextForm } from '../../ui/Inputs/InputTextForm'
import { InputFileForm } from '../../ui/Inputs/InputFileForm'



type RegisterMainViewFormType={
  firstName:{
    value:string,
    success:boolean,
    error:string
  },
   lastName:{
    value:string,
    success:boolean,
    error:string
   },
   avatar:{
    success:boolean,
    error:string
   }
}
const registerMainViewSchema = z.object({
  firstName: z.string().min(1, 'First Name must be at least 1 characters long'),
  lastName: z.string().min(1, 'Last Name must be at least 1 characters long')
})

const INITIAL_REGISTER_MAIN_VIEW_FORM:RegisterMainViewFormType = {
 firstName:{
    value:'',
    success:true,
    error:''
  },
   lastName:{
    value:'',
    success:true,
    error:''
   },
   avatar:{
    success:true,
    error:''
   }
}

interface RegisterMainViewProps{
  onSuccess:(firstName:string,lastName:string)=>void
}

export const RegisterMainViewForm = ({onSuccess}:RegisterMainViewProps) =>{

    const [mainViewForm,setMainViewForm] = useState(INITIAL_REGISTER_MAIN_VIEW_FORM)


    const firstNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
setMainViewForm((prevState:RegisterMainViewFormType)=>({...prevState,firstName:{...prevState.firstName,value:e.target.value}}))
}

const lastNameHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
setMainViewForm((prevState:RegisterMainViewFormType)=>({...prevState,lastName:{...prevState.lastName,value:e.target.value}}))
}

    const submitFormHandler = async(e:React.FormEvent) =>{
e.preventDefault();
setMainViewForm({...INITIAL_REGISTER_MAIN_VIEW_FORM})
// setMainViewForm(INITIAL_REGISTER_MAIN_VIEW_FORM)
const result = registerMainViewSchema.safeParse({
      firstName: mainViewForm.firstName.value,
      lastName: mainViewForm.lastName.value
    })

if (!result.success) {
    const newState = { ...mainViewForm };
    result.error.issues.forEach(err => {
      if (err.path[0] === "firstName") {
        newState.firstName.success = false;
        newState.firstName.error = err.message;
      }
      if (err.path[0] === "lastName") {
        newState.lastName.success = false;
        newState.lastName.error = err.message;
      }
    });
    setMainViewForm(newState);
    return;
  }
 
const avatar = localStorage.getItem("avatar");
 if (!avatar || avatar.trim() === "") {
    setMainViewForm(prev => ({
      ...prev,
      avatar: {
        success: false,
        error: "Please upload your avatar"
      }
    }));
    return;
    
  }
  onSuccess(mainViewForm.firstName.value,mainViewForm.lastName.value)
   
}

    return <main className="flex flex-row items-center justify-center h-screen w-full">
<img src={LayoutImage.src} className='w-full h-full  blur-sm'/>
<div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
<div className='flex absolute top-0 left-0 w-full h-full items-center justify-center '>
    <div className='z-10 sm:w-[586px] sm:h-auto rounded-[26px] bg-white flex flex-col gap-4 py-[22px] px-[31px]'>
        <h1 className='font-medium text-black text-2xl'>Almost there!</h1>
        <p className='font-normal text-[14px]'>We just need some more information...</p>
        <form onSubmit={submitFormHandler} className='flex flex-col gap-2'>
             <InputTextForm value={mainViewForm.firstName.value} onChange={firstNameHandler} success={mainViewForm.firstName.success} error={mainViewForm.firstName.error} placeholder='First Name'/>
       <InputTextForm value={mainViewForm.lastName.value}  onChange={lastNameHandler} success={mainViewForm.lastName.success} error={mainViewForm.lastName.error} placeholder='Last Name'/>
       <InputFileForm success={mainViewForm.avatar.success} error={mainViewForm.avatar.error}/>
  
       <button type='submit' className='py-2.5 px-4 bg-purple-600 text-white rounded-lg w-fit h-min'>Login me</button>
        </form>
    </div>
</div>
    </main>
}