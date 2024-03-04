import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { fetchProductsAction } from '../../redux/slices/ProductSlice'
import { baseUrl } from '../../utils/url'
import { Link } from 'react-router-dom'
import Products from '../customers/Products'

function TrendingProducts() {

    const url=`${baseUrl}products`
    
      const dispatch=useDispatch()
      useEffect(()=>{
        dispatch(fetchProductsAction({url}))
      },[dispatch,url])

      const allproducts= useSelector((state)=>state.products.products.products)
      //console.log(products)
      const products=allproducts?.slice(0,4)

  return (
    <>
        <h4 className='mx-auto text-2xl font-bold text-gray-900 max-w-2xl px-2 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>Trending products</h4>
        <div className="mx-auto text-xl font-bold text-gray-900 max-w-2xl px-2 py-1 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <Link
              to={'/product-filter'}
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Show more
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
       <Products products={products} />
    </>
  )
}

export default TrendingProducts
