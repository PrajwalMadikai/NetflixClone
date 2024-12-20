import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { UserAuth } from '../context/AuthContext';
export const Signup = () => {
       let [email,setEmail]=useState('')
       let [password,setPassword]=useState('')
       let {user,signup}=UserAuth()
       const navigate=useNavigate()
       
       const handleSumbit=async(e)=>{
            e.preventDefault()
            try {
                await signup(email,password)
                 toast.success("Signup successful! Welcome!", {
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
             
               toast.error(`Signup failed`, {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: false,
                              theme: "dark",
                            });
                navigate('/signup')
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
            <h1 className='text-3xl font-bold'>Sign Up</h1>
             <form onSubmit={handleSumbit} className='w-full flex flex-col py-4'>
             <input className='p-3 my-2 bg-gray-700' type="email" name="" id="" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
             <input className='p-3 my-2 bg-gray-700'
              type="password" name="" id="" placeholder='Password'
              autoComplete='current-password' onChange={(e)=>setPassword(e.target.value)} />
              <button className='bg-red-600 py-3 my-6 rounded font-bold '>Sign up</button>
              <div className='flex justify-between items-center text-sm text-gray-600'>
               <p><input type="checkbox" className='mr-2' name="" id="" />Remember me</p>
               <p>Need Help?</p>
              </div>
              <p className='py-8'><span className='text-gray-600'>Already subscribed to Netflix? </span>{' '}<Link to='/login'>Sign In</Link></p>
             </form> 
           </div>
         </div>
      </div>
     </div>
     </>
  )
}
