import React, { useEffect } from 'react'
import Login from './Login'
import Browes from './Browes'
import { createBrowserRouter, } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase.js';
import {useDispatch} from "react-redux"
import {addUser,removeUser} from '../utils/userSlice.js'

function Body() {

    const dispatch = useDispatch()


    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browes',
            element: <Browes/>
        }
    ])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
             
              const {uid,email,displayName,photoURL} = user;
                dispatch(addUser({uid: uid,email: email,displayName: displayName,photoURL: photoURL}))

            } else {
             dispatch(removeUser())
            }
          });
    },[])

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body