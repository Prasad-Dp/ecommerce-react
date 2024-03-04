 import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

 const initialState={
    loading:false,
    error:null,
    sales:{}
 }

 export const getSalesReportAction=createAsyncThunk('sales/report',
    async({url},{rejectWithValue})=>{
        try{
            const token=localStorage.getItem('token')
            const response=await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return  response.data
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
 )

 const salesSlice=createSlice({
    name:'sales',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getSalesReportAction.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getSalesReportAction.fulfilled,(state,action)=>{
            state.sales=action.payload
            state.loading=false
        })
        builder.addCase(getSalesReportAction.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
        })
        
    }
 })

 export default salesSlice.reducer