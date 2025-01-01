import React, { useState } from 'react'

const Login = () => {

  const [State, setState] = useState('Sign Up')

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center' onClick={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{State === "Sign Up" ? 'Create Account' : "Login"}</p>
        <p>{State === "Sign Up" ? "Please sign up to book appointment" : "Please log in to book appointment"}</p>
        {State==="Sign Up"?
        <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="text" onChange={(e) => setName(e.target.value)} value={Name} />
        </div>:''
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="email" onChange={(e) => setName(e.target.value)} value={Email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-[#DADADA] rounded w-full p-2 mt-1' required type="password" onChange={(e) => setName(e.target.value)} value={Password} />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{State === "Sign Up" ? "Create account" : "Login"}</button>
        <p>{State==="Sign Up"?"Already have an account?":"Create an new account?"}<span onClick={()=>State==="Sign Up"?setState('Login'):setState("Sign Up")} className='text-primary underline cursor-pointer'>Click here</span></p>
      </div>

    </form>
  )
}

export default Login
