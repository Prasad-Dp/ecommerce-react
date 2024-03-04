import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/url";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  color: {},
  colors: {},
};

export const fetchColorsAction = createAsyncThunk(
  "fetch/color",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}colors`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createColorAction = createAsyncThunk(
  "create/color",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}colors/create`, payload, {
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

export const deleteColorAction = createAsyncThunk(
  "delete/color",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}colors/${id}`, {
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

const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchColorsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.colors = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //cteate color
    builder.addCase(createColorAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.color = action.payload;
      state.loading = false;
    });

    builder.addCase(createColorAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default colorSlice.reducer;
