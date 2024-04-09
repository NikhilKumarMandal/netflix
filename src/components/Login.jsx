import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {addUser,removeUser} from '../utils/userSlice.js'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // true is sign in and false is sign up
  const [isSignInFrom,setIsSignInFrom] = useState(true) 
  const [errorMessage,setErrorMessage] = useState(null)

  const email = useRef(null)
  const password = useRef(null)
  const username = useRef(null)

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value,password.current.value,)
    setErrorMessage(message)
    if(message) return;

    if (!isSignInFrom) {

      // SignUp
  createUserWithEmailAndPassword(
    auth,
    email.current.value,
    password.current.value
    )
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: username.current.value,
      photoURL: "https://avatars.githubusercontent.com/u/155902231?v=4"
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({
        uid: uid,
        email: email,
        displayName: displayName,photoURL: photoURL
      })
    )
        console.log(user);
    }).catch((error) => {
      setErrorMessage(error.message)
    });
    


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    setErrorMessage(errorCode + "-" + errorMessage)

  });

    }else {
      signInWithEmailAndPassword(
      auth,
      email.current.value, 
      password.current.value
    )
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });

    }
  }

  const toggleSignInfrom = () => {
    setIsSignInFrom(!isSignInFrom)
  }

  return (
    <div>
        <Header/>
        <div className='absolute' >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="logo" />
     
        </div>
        <form onSubmit={(e) => e.preventDefault() } className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInFrom ? "Sign In" : "Sign Up"}</h1>

            {!isSignInFrom && (<input ref={username} type="text" placeholder='username' className='p-4 my-4 w-full bg-gray-700' />)}
            
            <input ref={email} type="email" placeholder='email' className='p-4 my-4 w-full bg-gray-700' />

            <input type="password" ref={password} placeholder='password' className='p-4 my-4 w-full bg-gray-700' />

            <p className='text-red-800 font-bold text-lg py-2 '>{errorMessage}</p>

            <button className='py-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInFrom ? "Sign In" : "Sign Up"}</button>

            <p className='text-opacity-5 py-4 cursor-pointer' onClick={toggleSignInfrom}>{isSignInFrom ? "New to Netflix ? " : "Already have account ? "} <span className='text-opacity-100'>{isSignInFrom ? "Sign Up" : "Sign In"}</span> </p>

        </form> 
        
    </div>
  )
}

export default Login