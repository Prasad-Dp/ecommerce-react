import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../utils/url";

const initialState = {
  loading: false,
  order: {},
  error: null,
  orders: [],
};

export const placeOrderAction = createAsyncThunk(
  "place/order",
  async (
    { orderItems, subtotal, discountAmount, total, discountrate },
    { rejectWithValue }
  ) => {
    try {
      const discount = discountAmount;
      const totalPrice = total;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}orders/neworder`,
        {
          orderItems,
          subtotal,
          discount,
          totalPrice,
          discountrate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      //window.location.href((await response).data.url)
      window.open(response.data.url);
      localStorage.removeItem("cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "update/order",
  async ({ id, status, deliveredAt }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseUrl}orders/${id}`,
        {
          status,
          deliveredAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ordersListAction = createAsyncThunk(
  "all/orders",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderInfoAction = createAsyncThunk(
  "get/order",
  async ({ url }, { rejectWithValue }) => {
    try {
      //console.log(url)
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (buider) => {
    buider.addCase(placeOrderAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    buider.addCase(placeOrderAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //get orderinfo
    buider.addCase(getOrderInfoAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(getOrderInfoAction.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    buider.addCase(getOrderInfoAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //orders list
    buider.addCase(ordersListAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(ordersListAction.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    buider.addCase(ordersListAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //update order
    buider.addCase(updateOrder.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(updateOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
    buider.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default ordersSlice.reducer;
