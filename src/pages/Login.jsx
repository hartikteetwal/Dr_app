import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const { token, setToken , backendUrl}=  useContext(AppContext)
  const [State, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  },[token])

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (State === "Sign Up") { 
        const {data} = await axios.post(backendUrl+"/api/user/register",{name,email,password})
        if (data.success) {
          setToken(data.token)
          localStorage.setItem("token", data.token)
        } else {
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendUrl+"/api/user/login", { password, email })
        if (data.success){
          setToken(data.token)
          localStorage.setItem("token", data.token)
        } else {
          toast.error(data.message)
        }
        
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  }

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{State === "Sign Up" ? 'Create Account' : "Login"}</p>
        <p>{State === "Sign Up" ? "Please sign up to book appointment" : "Please log in to book appointment"}</p>
        {State==="Sign Up"?
        <div className='w-full'>
          <p>Full name</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>:''
        }
        <div className='w-full'>
          <p>email</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>password</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{State === "Sign Up" ? "Create account" : "Login"}</button>
        <p>{State==="Sign Up"?"Already have an account?":"Create an new account?"}<span onClick={()=>State==="Sign Up"?setState('Login'):setState("Sign Up")} className='text-primary underline cursor-pointer'>Click here</span></p>
      </div>

    </form>
  )
}

export default Login
