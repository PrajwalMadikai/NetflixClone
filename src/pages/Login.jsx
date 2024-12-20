import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { UserAuth } from '../context/AuthContext';

export const Login = () => {
     
     const {user,login}=UserAuth()
     let[email,setEmail]=useState('')
     let[password,setPassword]=useState('')
     let [Error,setError]=useState('')
     const navigate=useNavigate()

     const handleLogin=async(e)=>{
         e.preventDefault()
         setError('')
         try {
               await login(email,password)  
                toast.success("Login successful ", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  theme: "dark",
              });
          
               navigate('/')        
         } catch (error) {
          setError(error)
          toast.error(`Login failed: ${error.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "dark",
          });
          navigate('/login')
         }
     }



  return (
    <>
    <div className='w-full h-screen' >
       <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
       alt="signup" className='hidden sm:block w-full absolute h-full object-cover' />
     <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
     <div className='fixed w-full px-4 py-24 z-50'>
        <div className='max-w-[450px] max-h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16 '>
           <h1 className='text-3xl font-bold'>Sign In</h1>
            <form onSubmit={handleLogin} className='w-full flex flex-col py-4'>
            <input className='p-3 my-2 bg-gray-700' type="email" name="" id="" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
            <input className='p-3 my-2 bg-gray-700'
             type="password" name="" id="" placeholder='Password'
             autoComplete='current-password' onChange={(e)=>setPassword(e.target.value)} />
             <button className='bg-red-600 py-3 my-6 rounded font-bold '>Sign In</button>
             <div className='flex justify-between items-center text-sm text-gray-600'>
              <p><input type="checkbox" className='mr-2' name="" id="" />Remember me</p>
              <p>Need Help?</p>
             </div>
             <p className='py-8'><span className='text-gray-600'>New to Netflix? </span>{' '}<Link to='/signup'>Sign Up</Link></p>
            </form> 
          </div>
        </div>
     </div>
    </div>
    </>
  )
}
