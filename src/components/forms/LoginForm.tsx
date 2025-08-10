'use client'


export const  LoginForm = () =>{

    const loginFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login:"bb8",password:"Test10082025"}),
    }); 
    return data
    }
    loginFNC()
     const logoutFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({login:"bb8",password:"Test10082025"}),
    }); 
    return data
    }
    // logoutFNC()
    
    return <form></form>
}