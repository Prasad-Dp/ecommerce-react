import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCouponAction } from '../../../redux/slices/couponSlice';

function AddCoupon() {
    const [couponData,setCouponData]=useState({})
    const dispatch=useDispatch()

    const handelChange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target
        setCouponData({
            ...couponData,
            [name]:value
        })
    }
    const handelSubmit=(e)=>{
        e.preventDefault();
        //console.log(couponData)
        dispatch(createCouponAction(couponData))

    }
  return (
   <>
    <form className="px-7 h-full grid justify-center items-center ">
  <div className="grid gap-3" id="form">
    <div className="w-full flex gap-3">
      <input
        className="p-3 uppercase shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
        type="text"
        placeholder="Enter coupon code"
        id="Last-Name"
        name="coupon"
        onChange={handelChange}
      />
    </div>
    <div className="grid gap-3 w-full">
      
      <input
        className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
        type="date"
        required=""
        placeholder='start date'
        name='startDate'
        onChange={handelChange}
      />
       <input
        className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
        type="date"
        required=""
        placeholder='end date'
        name='endDate'
        onChange={handelChange}
      />
    </div>
    <div className="w-full flex gap-3">
      <input
        className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
        type="number"
        placeholder="Enter discount value"
        id="Last-Name"
        name="discount"
        onChange={handelChange}
      />
    </div>
    
    <button
      className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
      type="submit"
      onClick={handelSubmit}
    >
      Submit
    </button>
  </div>
</form>

   </>
  )
}

export default AddCoupon
