import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createColorAction } from '../../../redux/slices/colorSlice';

function AddColor() {
    
    const dispatch=useDispatch()

    const [color,setColor]=useState({})

    const handelChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target
        setColor({
            ...color,
            [name]:value
        })
    }

    const handelSubmit=(e)=>{
        e.preventDefault();
        dispatch(createColorAction(color))
    }

  return (
    <div>
      <>
   <div className="flex flex-col items-center justify-center w-full  h-full mt-20 light">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Color</h2>

    <form className="flex flex-col" onSubmit={handelSubmit} >
      <input placeholder="Enter color name" className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" name='color' onChange={handelChange} />


      <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit" onClick={handelSubmit} >Add</button>
    </form>
  </div>
</div>

   </>
    </div>
  )
}

export default AddColor
