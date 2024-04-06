import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import {useNavigate} from 'react-router-dom'

function Header() {

  const navigate = useNavigate()
  

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
    
  }
  return (
    <div
    className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'
    >
    <img 
    className='w-40'
    src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />  
    <div className='flex p-2'>
      <img
      className='w-12 h-12 p'
      src="user icons" alt="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" />
      <button onClick={handleSignout} className='font-blod text-white'>(Sign Out)</button>
    </div>
    </div>
  )
}

export default Header