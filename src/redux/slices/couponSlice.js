import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../utils/url";

const initialState = {
  loading: false,
  coupon: {},
  error: null,
  coupons: [],
};

export const checkCouponAction = createAsyncThunk(
  "check/coupon",
  async ({ url }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      toast.success("coupon applied");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCouponsListAction = createAsyncThunk(
  "coupon/list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}coupons`);
      //toast.success('coupon applied')
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCouponAction = createAsyncThunk(
  "create/cupon",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}coupons/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCouponAction = createAsyncThunk(
  "delete/coupon",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}coupons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  extraReducers: (builder) => {
    //check cupons
    builder.addCase(checkCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(checkCouponAction.fulfilled, (state, action) => {
      state.coupon = action.payload;
      state.loading = false;
    });
    builder.addCase(checkCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //create coupon
    builder.addCase(createCouponAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.coupon = action.payload;
      state.loading = false;
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //coupons list
    builder.addCase(fetchCouponsListAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsListAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCouponsListAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default couponSlice.reducer;
