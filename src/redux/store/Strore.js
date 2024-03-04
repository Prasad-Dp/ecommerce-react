import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/UserSlice'
import productReducer from '../slices/ProductSlice'
import categoryReducer from '../slices/categorySlice'
import colorReducer from '../slices/colorSlice'
import brandReducer from '../slices/brandSlice'
import cartReducer from '../slices/cartSlice'
import couponReducer from '../slices/couponSlice'
import ordersSlice from '../slices/ordersSlice'
import salesReducer from '../slices/reportSlice'

const Store=configureStore({
    reducer:{
        users: userReducer,
        products:productReducer,
        category:categoryReducer,
        colors:colorReducer,
        brands:brandReducer,
        cart:cartReducer,
        coupon:couponReducer,
        orders:ordersSlice,
        sales:salesReducer

    }
})

export default Store