import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'; 


const Login = () => {
    const[state, setState]=useState('Login')

    const{setUser,setShowLogin ,backendUrl, token, setToken,}= useContext(AppContext)

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')


    const onSubmitHandler =async(e)=>{
        e.preventDefault();
        console.log('submit....')

        try{
            console.log('welcome 1')
            if(state === 'Login'){
                console.log('welcome 2')
                const {data}= await axios.post(backendUrl + '/api/user/login',{email,password})

                if(data.success){
                    console.log('welcome 3')
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    console.log('welcome err 0')
                    
                    toast.error(data.message)
                    console.log('error:',err.message)
                }
            }else{
                console.log('welcome 4')
                const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password})
                console.log('data is',data)
                if(data.success){
                    console.log('welcome 5')
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
                }else{
                    console.log('welcome 00')
                    toast.error(data.message)
                    console.error(err.message)
                    console.log('error:',err.message)
                }
            }

        }catch(err){
            toast.error(err.message)
            console.error(err.message)
            console.log('error:',err.message)

        }
    }
    

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return()=>{
            document.body.style.overflow = 'unset';
        }

    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0
     z-10 backdrop-blur-sm bg-black/30 flex
     justify-center items-center'>
        <form 
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700
        font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

           { state !== 'Login' && <div className='border px-6 py-2 flex items-center ap-2 rounded-full mt-5'>
                <img src={assets.user_icon} alt=''/>
                <input 
                type='text'
                className='outline-none text-sm' 
                placeholder='Full Name ' 
                required
                onChange={e=>setName(e.target.value)}
                value={name}
                />
            </div>}

            <div className='border px-6 py-2 flex items-center ap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt=''/>
                <input type='Email'
                className='outline-none text-sm'
                placeholder='Email id '
                required
                onChange={e=>setEmail(e.target.value)}
                value={email}
                />
            </div>

            <div className='border px-6 py-2 flex items-center ap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt=''/>
                <input type='password'
                className='outline-none text-sm'
                placeholder='Password '
                required
                onChange={e=>setPassword(e.target.value)}
                value={password}
                />
            </div>
            
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full '>{state === 'Login'? 'login' : 'create account'}</button>
            
            { state === 'Login'? <p className='mt-5 text-center'>Don't have an account?
                <span onClick={()=>setState('Sign up')} className='text-blue-600 cursor-pointer'>Sign up</span>
            </p>

            :

            <p className='mt-5 text-center'>Already have an account?
                <span onClick={()=>setState('Login')} className='text-blue-600 cursor-pointer'>Login</span>
            </p>}

            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt=' ' className='absolute
            top-5 right-5 cursor-pointer'/>
        </form>
    </div>
  )
}

export default Login