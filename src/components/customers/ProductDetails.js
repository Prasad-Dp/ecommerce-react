import React, { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addtocartAction, getcartList } from "../../redux/slices/cartSlice";
import { fetchSingelProductsAction } from "../../redux/slices/ProductSlice";
import { baseUrl } from "../../utils/url";




const ProductDetails = () => {


  const [color,setColor]=useState('')
  const [size,setSize]=useState('')

  const [dis,setDis]=useState(true)
  const [review,setReview]=useState(false)

    const params=useParams()
    const url=`${baseUrl}products/${params.id}`
    //console.log(url)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchSingelProductsAction({url}))
        dispatch(getcartList())
    },[url,dispatch])

    const product=useSelector((state)=>state.products.product.product)
    //console.log(product)
    const cartItems=useSelector((state)=>state.cart.cartItems)
    //console.log(cartItems)
    const itemExist=cartItems?.find((item)=>item?.id?.toString()===product?._id?.toString())
    //console.log(itemExist)
    const handelCart=()=>{
      if(itemExist){
        toast.error('item already in cart')
      }

      else if(!color){
        toast.error('Please select color')
      }
      else if(!size){
        toast.error('Please select size')
      }
      else{
        //console.log(product?._id,product?.name,color,size,product?.price,product?.totalQty)
        dispatch(addtocartAction({
          _id:product?._id,
          name:product?.name,
          image:product?.images[0],
          description:product?.description,
          color:color,
          size:size,
          price:product?.price,
          totalQty:product?.totalQty,
          orderQty:1,
          totalPrice:product?.price

        }))
        dispatch(getcartList())
      }
    }
    const handelReviews=()=>{
      setReview(true)
      setDis(false)
    }

    const handelDis=()=>{
      setReview(false)
      setDis(true)
    }
    return (
      <>
      
      <section className="py-1 sm:py-1">
      <div className="container mx-auto px-4">
        <nav className="flex">
          <ol  className="flex items-center">
            <li className="text-left">
              <div className="-m-1">
                <Link
                  to={'/'}
                  className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                >
                  {" "}
                  Home{" "}
                </Link>
              </div>
            </li>
            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link to={'/product-filter'}
                    href="#"
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                  >
                    {" "}
                    Products{" "}
                  </Link>
                </div>
              </div>
            </li>
            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <Link
    
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    aria-current="page"
                  >
                    {" "}
                    {product?.name}{" "}
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg ">
                  <img
                    className="h-1/2 w-1/2 max-w-1/2 object-cover"
                    src={product?.images[0]}
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={product?.images[0]}
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={product?.images[0]}
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={product?.images[0]}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h2 className="sm: text-xl font-bold text-gray-900 sm:text-3xl">
              {product?.name}
            </h2>
            <h6>{product?.brand}</h6>
            {
                product?.avearageRating &&(
                  <>
                     <div className="mt-5 flex items-center">
              
              <div className="flex items-center">
              {[...Array(5)].map((_, index) => {  
             
              if (index+1 <= product?.avearageRating) {
                  return (
                      <svg
                          key={index}
                          className="block h-4 w-4 align-middle text-yellow-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                          <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                          />
                      </svg>
                  );
              } else {
                  return (
                      <svg
                          key={index}
                          className="block h-4 w-4 align-middle text-black-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                      >
                          <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                          />
                      </svg>
                  );
              }
          })}

{/* 
                <svg
                  className="block h-4 w-4 align-middle text-black-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg> */}
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                {product?.reviews?.length}
              </p>
            </div>
                  </>
                )
              }
           
            <h2 className="mt-8 text-base text-gray-900">Color</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {
                product?.colors?.map((color)=>(
                  <label key={color} className="">
                <input 
                  type="radio"
                  name="color"
                  value={color}
                  onClick={()=>setColor(color)}
                  // defaultValue="Powder"
                  className="peer sr-only"
                  // defaultChecked=""
                />
                <p className={`bg-${color}-700 peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold`}>
                  {color}
                </p>
              </label>
                ))
              }
              
            </div>
            <h2 className="mt-8 text-base text-gray-900">Choose Size</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {product?.size?.map((sizes)=>(
                <label key={sizes} className="">
                <input
                  type="radio"
                  name="size" onClick={()=>setSize(sizes)}
                  value={setSize}
                  className="peer sr-only"
                />
                <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold ">
                  {sizes}
                </p>
                </label>
              ))}
              
            </div>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">RS.{product?.price}</h1>
                <span className="text-base"><strike>{product?.price}</strike></span>
              </div>
              {
                product?.totalleft<=0 ?(
                  <>
                  <button
                type="button"
                onClick={handelCart}
                disabled
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                out of stock
              </button>
                  </>
                ):(
                <>
                <button
                type="button"
                onClick={handelCart}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
                </>
                )
              }
              {/* <button
                type="button"
                onClick={handelCart}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button> */}
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    className=""
                  />
                </svg>
                Free shipping order over 500
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <svg
                  className="mr-2 block h-5 w-5 align-middle text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    className=""
                  />
                </svg>
                Cancel Anytime
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <Link
                  onClick={handelDis}
                  title=""
                  className=" border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  {" "}
                  Description{" "}
                </Link>
                <Link
                  
                  title=""
                  onClick={handelReviews}
                  className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-900"
                >
                  Reviews
                  <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                    {product?.reviews?.length}{" "}
                    {" "}
                  </span>
                </Link>
              </nav>
            </div>
            <div className="mt-8 flow-root sm:mt-12">
              {/* <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                accusantium nesciunt fuga.
              </p>
              <h1 className="mt-8 text-3xl font-bold">
                From the Fine Farms of Brazil
              </h1>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                numquam enim facere.
              </p>
              <p className="mt-4">
                Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum
                nostrum eius facere, ad neque.
              </p> */}
              {
                dis &&(
                  product?.description.split("\n").map((i,key) => {
                    return <div key={key}>{i}</div>;
                })
                )
              }
              {/* {product?.description.split("\n").map((i,key) => {
            return <div key={key}>{i}</div>;
        })} */}

       {
        review && (
          <ul className="">
  {product?.reviews?.map((review)=>(
      <li className="py-2 text-left border px-4 m-2">
      <div className="flex items-start">
        <div className="ml-6">
          <div className="flex items-center">
          {[...Array(5)].map((_, index) => {  
             
             if (index+1 <= review?.rating) {
                 return (
                  <svg
                  className="block h-6 w-6 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                 );
             } else {
                 return (
                  <svg
                  className="block h-6 w-6 align-middle text-black-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  />
                </svg>
                 );
             }
         })}
            {/* <svg
              className="block h-6 w-6 align-middle text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              />
            </svg>
            <svg
              className="block h-6 w-6 align-middle text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              />
            </svg>
            <svg
              className="block h-6 w-6 align-middle text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              />
            </svg>
            <svg
              className="block h-6 w-6 align-middle text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              />
            </svg>
            <svg
              className="block h-6 w-6 align-middle text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              />
            </svg> */}
          </div>
          <p className="mt-1 text-base text-gray-900">
            {review?.message}
          </p>
          <p className="mt-1 text-sm font-bold text-gray-900">{'verified purcheser'}</p>
          <p className="mt-1 text-sm text-gray-600">{review?.createdAt}</p>
        </div>
      </div>
    </li>
  ))}
  
</ul>

        )
       }
            </div>
          </div>
        </div>
      </div>
    </section>
      </>
    
    );
};

export default ProductDetails;
