import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAction } from '../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Register() {

    const [userData,setUserData]=useState({})
    const dispath=useDispatch()
    const navigate=useNavigate()
    

    const handelChange=(e)=>{
      e.preventDefault()
      const {name,value}=e.target
      setUserData({
        ...userData,
       [name]:value
      })

    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(userData)
      const {name,email,password}=userData
      dispath(registerAction({name,email,password}))

      
      
    }

    const user= useSelector((state)=>state.users.register)
    //console.log(user)
    if(user.userInfo.status){
      navigate('/login')
    }
    
  return (
    <>
     <div className="flex flex-col items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Register</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
              placeholder="Full Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text" name='name' onChange={handelChange}
            />
            <input
              placeholder="Email address"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email" name='email' onChange={handelChange}
            />
            <input
              placeholder="Password"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password" name='password' onChange={handelChange}
            />
            <div className="flex items-center justify-between flex-wrap">
              
              
              <p className="text-white mt-4">
                Already have account? <Link className="text-sm text-blue-500 hover:underline mt-4" to={'/login'} >Login</Link>
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
