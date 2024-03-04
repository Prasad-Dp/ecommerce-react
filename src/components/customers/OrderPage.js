import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getcartList } from '../../redux/slices/cartSlice'
import { checkCouponAction } from '../../redux/slices/couponSlice'
import { placeOrderAction } from '../../redux/slices/ordersSlice'
import { getUserAction, shippingAddressAction } from '../../redux/slices/UserSlice'
import { baseUrl } from '../../utils/url'


function OrderPage() {

    const dispatch=useDispatch()
    const naviagate=useNavigate()
    const [couponCode,setCouponCode]=useState('')
    const [showForm,setShowForm]=useState(false)

    const [addres,setAddres]=useState({})

    useEffect(()=>{
        dispatch(getcartList())
        dispatch(getUserAction())
    },[dispatch])
    const orderItems=useSelector((state)=>state.cart.cartItems)
    const userInfo=useSelector((state)=>state.users.userAuth.userInfo.user)
    //console.log(userInfo)

    const handelCoupon=()=>{
        const url=`${baseUrl}coupons/${couponCode}`
        dispatch(checkCouponAction({url}))
      }
      const discount=useSelector((state)=>state.coupon.coupon.coupon)
      const totalPrice=orderItems?.reduce((acc,current)=>(
          acc+=current?.totalPrice
      ),0)
      let finalPrice=totalPrice
      let discountPrice=0
      if(discount?.discount){
        discountPrice=(totalPrice*discount?.discount)/100
        finalPrice=totalPrice-((totalPrice*discount?.discount)/100)
      }

      const showAddressForm=()=>{
        setShowForm(!showForm)
      }

      const handelAddress=(e)=>{
        e.preventDefault();
        const {name,value}=e.target
        setAddres({
            ...addres,
            [name]:value
        })
      }

      const submitAddress=(e)=>{
        e.preventDefault();
        console.log(addres)
        const {
            name,
            phone,
            address,
            city,
            state,
            country,
            pincode
        }=addres
        dispatch(shippingAddressAction({
            name,
            phone,
            address,
            city,
            state,
            country,
            pincode
        }))
        dispatch(getUserAction())
        setShowForm(!showForm)
      }
      
      const placeOrder=()=>{
        if(userInfo?.hasShippindAddress){
            let discountrate=0
            if(discount?.discount){
              discountrate=discount?.discount
            }
            const subtotal=totalPrice
            const discountAmount=discountPrice
            const total=finalPrice
            //console.log(orderItems,subtotal,discountAmount,total,discountrate)
            dispatch(placeOrderAction({
              orderItems,
              subtotal,
              discountAmount,
              total,
              discountrate
            }))
            
            naviagate('/')
            
        }
        else{
            toast.error('Please add address')
        }
        
      }
  return (
    <>
    {/* <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
      <a href="#" className="text-2xl font-bold text-gray-800">
        sneekpeeks
      </a>
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </a>
              <span className="font-semibold text-gray-900">Shop</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                href="#"
              >
                2
              </a>
              <span className="font-semibold text-gray-900">Shipping</span>
            </li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                href="#"
              >
                3
              </a>
              <span className="font-semibold text-gray-500">Payment</span>
            </li>
          </ul>
        </div>
      </div>
    </div> */}
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {
                orderItems?.map((cart)=>(
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={cart?.image}
                    alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">
                        {cart?.name}
                    </span>
                    <span className="float-right text-gray-400">{cart?.color} - {cart?.size}</span>
                    <p className="text-lg font-bold">Rs.{cart?.price} X {cart?.Qty} = Rs.{cart?.totalPrice}</p>
                    </div>
                </div>
                ))
            }
        </div>
        {/* <p className="mt-8 text-lg font-medium">Shipping Methods</p>
        <form className="mt-5 grid gap-6">
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              defaultChecked=""
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_1"
            >
              <img
                className="w-14 object-contain"
                src="/images/naorrAeygcJzX0SyNI4Y0.png"
                alt=""
              />
              <div className="ml-5">
                <span className="mt-2 font-semibold"> Pay Online</span>
                <p className="text-slate-500 text-sm leading-6">
                  Delivery: 2-4 Days
                </p>
              </div>
            </label>
          </div>
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_2"
              type="radio"
              name="radio"
              defaultChecked=""
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_2"
            >
              <img
                className="w-14 object-contain"
                src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                alt=""
              />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Cash on Delivery</span>
                <p className="text-slate-500 text-sm leading-6">
                  Delivery: 2-4 Days
                </p>
              </div>
            </label>
          </div>
        </form> */}
      </div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Select Address</p>
        {/* <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p> */}
        {userInfo?.hasShippindAddress ?(
            <>
             <h6>Your address</h6>
             <span>Name: </span><span>{userInfo?.shippingAddress?.name}</span><br />
             <span>Phone: </span><span>{userInfo?.shippingAddress?.phone}</span><br />
             <span>Address: </span><span>{userInfo?.shippingAddress?.address}</span><br />
             <span>City: </span><span>{userInfo?.shippingAddress?.city}</span><br />
             <span>State: </span><span>{userInfo?.shippingAddress?.state}</span><br />
             <span>Country: </span><span>{userInfo?.shippingAddress?.country}</span><br />
             <span>Pincode: </span><span>{userInfo?.shippingAddress?.pincode}</span><br />
             <br />
             <button onClick={showAddressForm}>Add New Address</button>
            </>
        ):(
            <button onClick={showAddressForm}>Add New Address</button>
        )}
        {
            showForm &&(
                <form action="">
          <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="number"
              id="email"
              name="phone"
              onChange={handelAddress}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder=" your phone number"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg> */}
            </div>
          </div>
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="name"
              onChange={handelAddress}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg> */}
            </div>
          </div>
          <label
            htmlFor="card-no"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Address
          </label>
          <div className="relative">
            {/* <div className="relative w-7/12 flex-shrink-0"> */}
              <input
                type="text"
                id="card-no"
                name="address"
                onChange={handelAddress}
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Address"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                {/* <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg> */}
              </div>
            {/* </div> */}
            <input
              type="text"
              name="city"
              onChange={handelAddress}
              className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="city"
            />
            {/* <input
              type="text"
              name="credit-cvc"
              className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="CVC"
            /> */}
          </div>
          {/* <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Billing Address
          </label> */}
          <div className="flex flex-col justify-evenly sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input
                type="text"
                id="billing-address"
                name="state"
                onChange={handelAddress}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="State"
              />
              {/* <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  className="h-4 w-4 object-contain"
                  src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                  alt=""
                />
              </div> */}
            </div>
            <input
              type="text"
              name="country"
              className="flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Country"
            />
            <input
              type="text"
              name="pincode"
              onChange={handelAddress}
              className="flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="PinCode"
            />
          </div>
          
          <button onClick={submitAddress} className="w-full rounded-md border bg-black border-gray-200 px-2 mt-2 text-white py-3 pl-11 text-sm">Add Address</button>
          </form>
            )
        }
        <div className="">
        
          <div className="mt-6 border-t border-b py-2 flex items-center justify-between ">
            <input
              type="text"
              name="coupon"
              placeholder="COUPON"
              onChange={(e)=>setCouponCode(e.target.value)}
              className="border-2 px-2 gap-1 p-1 sm:gap-0"
            />
            <button onClick={handelCoupon} className="group inline-flex  items-center justify-center rounded-md bg-gray-900 py-1 px-4  text-sm font-semibold text-white transition-all duration-200 ease-in-out sm:px-1  focus:shadow hover:bg-gray-800">
              APPLY
            </button>
          </div>
          {/* Total */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">Rs.{totalPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Discount</p>
              <p className="font-semibold text-gray-900">Rs.{discountPrice}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">Rs.{finalPrice}</p>
          </div>
        </div>
        
        <button onClick={placeOrder} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
          Place Order
        </button>
      </div>
    </div>
  </>
  
  )
}

export default OrderPage
