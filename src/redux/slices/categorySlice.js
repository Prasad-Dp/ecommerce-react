import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../utils/url";

const initialState = {
  loading: false,
  error: null,
  category: {},
  categories: [],
};

export const fetchCategoriesAction = createAsyncThunk(
  "categories/featch",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}category`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.data.response);
    }
  }
);

export const createCategoryAction = createAsyncThunk(
  "create/category",
  async (payload, { rejectWithValue }) => {
    try {
      const { name, image } = payload;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", image);
      console.log(formData);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}category/create`, formData, {
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

export const deleteCategoryAction = createAsyncThunk(
  "delete/category",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}category/${id}`, {
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

const CategorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (buider) => {
    buider.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    buider.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //create category

    buider.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    buider.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
    });
    buider.addCase(createCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default CategorySlice.reducer;
