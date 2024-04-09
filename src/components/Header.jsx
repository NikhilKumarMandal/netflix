import React,{useEffect} from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch} from "react-redux"
import {addUser,removeUser} from '../utils/userSlice.js'

function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const handleSignout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            })
            )
            navigate("/browes")
        } else {
         dispatch(removeUser())
         navigate('/')
        }
      });

      //Unsubscribe when components unmounts
    return ()=>unsubscribe(); 

},[])

  return (
    <div
    className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'
    >
    <img 
    className='w-40'
    src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />  
    {user && <div className='flex p-2'>
      <img
      className='w-12 h-12 p'
      src={user?.photoURL} alt="user icons" />
      <button onClick={handleSignout} className='font-blod text-white'>(Sign Out)</button>
    </div>}
    </div>
  )
}

export default Header