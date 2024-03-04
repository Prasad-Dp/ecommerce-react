import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import { toast } from "react-hot-toast";

const initialState={
    cartItem:{},
    cartItems:[],
    loading:false,
    error:null
}

export const addtocartAction=createAsyncThunk('cart',
    async(payload)=>{
        //console.log(payload)
            const cartItems=localStorage.getItem('cart')?JSON.parse(
                localStorage.getItem('cart')):[]
            cartItems.push(payload)
            localStorage.setItem('cart',JSON.stringify(cartItems))
            toast.success('item added in cart')
    }
)

export const getcartList=createAsyncThunk('getcartList',
    async(payload)=>{
        const cartItems=localStorage.getItem('cart')?JSON.parse(
            localStorage.getItem('cart')):[]
        return cartItems
    }

)

export const updateCartAction=createAsyncThunk('update/cart',
    async({_id,qty})=>{
        //console.log(id,qty)
        const cartItems=localStorage.getItem('cart')?JSON.parse(
            localStorage.getItem('cart')):[]

        const newItems=cartItems?.map((item)=>{
            if(item?._id.toString()===_id.toString()){
                //console.log('matcheed')
                const newPrice=item?.price*qty
                item.orderQty=qty
                item.totalPrice=newPrice
            }
            //console.log(item)
            return item
        })
        localStorage.setItem('cart',JSON.stringify(newItems))
    }
)

export const deleteCartAction=createAsyncThunk('delete/cart',
    async({_id})=>{
        //console.log(id)
        const cartItems=localStorage.getItem('cart')?JSON.parse(
            localStorage.getItem('cart')):[]
        const remainItems=cartItems?.filter((item)=>
             item?._id.toString()!==_id.toString()
        )
        toast.success('removed from cart')
        localStorage.setItem('cart',JSON.stringify(remainItems))
    }
)

const cartSlice=createSlice({
    name:'cart',
    initialState,
    extraReducers:(buider)=>{
        //add to cart
        buider.addCase(addtocartAction.pending,(state,acion)=>{
            state.loading=true
        })
        buider.addCase(addtocartAction.fulfilled,(state,action)=>{
            state.cartItem=action.payload
            state.loading=false
        })
        buider.addCase(addtocartAction.rejected,(state,action)=>{
            state.error=action.payload
            state.error=false
        })
        //get cart list
        buider.addCase(getcartList.pending,(state,acion)=>{
            state.loading=true
        })
        buider.addCase(getcartList.fulfilled,(state,action)=>{
            state.cartItems=action.payload
            state.loading=false
        })
        buider.addCase(getcartList.rejected,(state,action)=>{
            state.error=action.payload
            state.error=false
        })
        //update
        buider.addCase(updateCartAction.pending,(state,acion)=>{
            state.loading=true
        })
        buider.addCase(updateCartAction.fulfilled,(state,action)=>{
            state.cartItems=action.payload
            state.loading=false
        })
        buider.addCase(updateCartAction.rejected,(state,action)=>{
            state.error=action.payload
            state.error=false
        })
        //delete
        buider.addCase(deleteCartAction.pending,(state,acion)=>{
            state.loading=true
        })
        buider.addCase(deleteCartAction.fulfilled,(state,action)=>{
            state.cartItems=action.payload
            state.loading=false
        })
        buider.addCase(deleteCartAction.rejected,(state,action)=>{
            state.error=action.payload
            state.error=false
        })
    }

})

export default cartSlice.reducer