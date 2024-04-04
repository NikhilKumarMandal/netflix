import React from 'react'
import Header from './Header'

function Login() {
  return (
    <div>
        <Header/>
        <div className='absolute' >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="logo" />
     
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>Sign In</h1>
            <input type="email" placeholder='email' className='p-4 my-4 w-full bg-gray-700' />
            <input type="password" placeholder='password' className='p-4 my-4 w-full bg-gray-700' />
            <button className='py-4 my-4 bg-red-700 w-full rounded-lg'>Sign In</button>
            <p className='text-opacity-5'>New to Netflex? <span className='text-opacity-100'>Sign Up Now</span> </p>
        </form> 
        
    </div>
  )
}

export default Login