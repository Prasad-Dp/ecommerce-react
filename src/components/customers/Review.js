import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productRatingAction } from '../../redux/slices/ProductSlice';
function Review() {

    const navigate=useNavigate()
    const params=useParams()
    const id=params.id

    const dispatch=useDispatch()

    const [rating,setRating]=useState({
        rating:0,
        message:''
})
    const ratingChanged=(newRating)=>{
        console.log(newRating)
        setRating({...rating,rating:newRating})
    }

    const handelRating=()=>{
        console.log(rating)
        dispatch(productRatingAction({id,rating}))
        navigate(`/profile/orders`)
    }

  return (
    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
  <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
    write your feedback
  </h2>
  <p className="mb-2 leading-relaxed text-gray-600">
    If you had any issues or you liked our product, please share with us!
  </p>
  <div className="mb-2">
  <ReactStars
    count={5}
    
    onChange={ratingChanged}
    
    size={40}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />,
  </div>
  <div className="mb-4">
    <label htmlFor="message" className="text-sm leading-7 text-gray-600">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      defaultValue={""}
      onChange={(e)=>setRating({...rating,message:e.target.value})}
    />
  </div>
  <button onClick={handelRating} className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">
    Send
  </button>
  <p className="mt-3 text-xs text-gray-500">
    Feel free to connect with us.
  </p>
</div>

  )
}

export default Review
