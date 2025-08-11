'use client'

export const Dashboard = () =>{

         const logoutFNC = async()=>{
 const data= await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }); 
    }

    return <button onClick={logoutFNC}>LOGOUT</button>
}