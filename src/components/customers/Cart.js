import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { deleteCartAction, getcartList, updateCartAction } from '../../redux/slices/cartSlice'
//import { baseUrl } from '../../utils/url'
//import { checkCouponAction } from '../../redux/slices/couponSlice'
import { Link } from 'react-router-dom'
function Cart() {

  const disapth=useDispatch()

  //const [couponCode,setCouponCode]=useState('')
  
  useEffect(()=>{
    disapth(getcartList())
  },[disapth])

  const cartItems=useSelector((state)=>state.cart.cartItems)

  const handelChange=(_id,qty)=>{
    console.log(_id,qty)
    disapth(updateCartAction({_id,qty}))
    disapth(getcartList())
  }
  const handelRemove=(_id)=>{
    //console.log(id)
    disapth(deleteCartAction({_id}))
    disapth(getcartList())
  
  }

  const discount=useSelector((state)=>state.coupon.coupon.coupon)
  const totalPrice=cartItems?.reduce((acc,current)=>(
      acc+=current?.totalPrice
  ),0)
  let finalPrice=totalPrice
  let discountPrice=0
  if(discount?.discount){
    discountPrice=(totalPrice*discount?.discount)/100
    finalPrice=totalPrice-((totalPrice*discount?.discount)/100)
  }
  
  return (
    <div>
      <section className="h-screen bg-gray-100 py-4 sm:py-5 lg:py-20">
  <div className="mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
    </div>
    <div className="mx-auto mt-4 max-w-2xl md:mt-12">
      <div className="bg-white shadow">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            <ul className="-my-8">
              {
                cartItems?.map((cart)=>(
                  <li key={cart._id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                  <div className="shrink-0">
                    <img
                      className="h-24 w-24 max-w-full rounded-lg object-cover"
                      src={cart?.image}
                      alt=""
                    />
                  </div>
                  <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                      <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-900">
                          {cart?.name}
                        </p>
                      
                        <p className="text-base font-semibold text-gray-900">
                          {`COLOR: [${cart?.color.toUpperCase()}`}]   {`SIZE: [${cart?.size}]`}
                        </p>
                      </div>
                      <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <p className="shrink-0 py-1 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                          Rs.{cart?.totalPrice}
                        </p>
                        <div className="sm:order-1">
                          <div className="mx-auto flex h-8 items-stretch text-gray-600">
                            <span className='border-2 px-2'>{cart?.price} </span>
                            <span className='px-2'>X</span>
                            <select name="unit" className='border-2 px-2' value={cart?.Qty} onChange={(e)=>handelChange(cart?._id,e.target.value)}>
                            {[...Array(cart?.totalQty)].map((x, i) =>
                               <option key={i+1} value={i+1}>{i+1}</option>
                            )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                      <button
                        type="button"
                        onClick={()=>handelRemove(cart?._id)}
                        className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                            className=""
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
                ))
              }
             
              
            </ul>
          </div>
          {/* <div className="mt-6 border-t border-b py-2 flex items-center justify-between ">
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
          </div> */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Subtotal</p>
              <p className="text-lg font-semibold text-gray-900">Rs.{totalPrice}</p>
            </div>
             <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">discount</p>
              <p className="text-lg font-semibold text-gray-900">Rs.{discountPrice}</p>
            </div> 
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              <span className="text-xs font-normal text-gray-400">INR</span>{" "}
              {finalPrice}
            </p>
          </div>
          <div className="mt-6 text-center">
            <Link to={'/order'}>
            <button
              type="button" 
              className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            >
              Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Cart
