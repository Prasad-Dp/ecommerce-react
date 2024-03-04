import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/url";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  brand: {},
  brands: [],
};

export const fetchbarndAction = createAsyncThunk(
  "featch/brand",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}brand`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBrandAction = createAsyncThunk(
  "create/brand",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { name, file } = payload;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const response = await axios.post(`${baseUrl}brand/create`, formData, {
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

export const deleteBrandAction = createAsyncThunk(
  "delete/brand",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}brand/${id}`, {
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

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (buider) => {
    buider.addCase(fetchbarndAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(fetchbarndAction.fulfilled, (state, action) => {
      state.brands = action.payload;
      state.loading = false;
    });
    buider.addCase(fetchbarndAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //create brand
    buider.addCase(createBrandAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(createBrandAction.fulfilled, (state, action) => {
      state.brand = action.payload;
      state.loading = false;
    });
    buider.addCase(createBrandAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //delete
    // buider.addCase(deleteBrandAction.pending, (state, action) => {
    //   state.loading = true;
    // });
    // buider.addCase(deleteBrandAction.fulfilled, (state, action) => {
    //   state.brand = action.payload;
    //   state.loading = false;
    // });
    // buider.addCase(deleteBrandAction.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // });
  },
});
export default brandSlice.reducer;
