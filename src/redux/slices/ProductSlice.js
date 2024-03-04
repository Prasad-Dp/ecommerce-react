import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/url";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  rating: {},
};

export const createProductAction = createAsyncThunk(
  "products/addproduct",
  async (payload, { rejectWithValue }) => {
    try {
      const {
        name,
        description,
        brand,
        category,
        size,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("brand", brand);
      formdata.append("price", price);
      formdata.append("totalQty", totalQty);
      formdata.append("category", category);

      size.forEach((sizes) => {
        formdata.append("size", sizes);
      });
      colors.forEach((color) => {
        formdata.append("colors", color);
      });
      files.forEach((file) => {
        formdata.append("files", file);
      });

      console.log(formdata);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}products/create`, formdata, {
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

export const fetchProductsAction = createAsyncThunk(
  "fetch/products",
  async ({ url }, { rejectWithValue }) => {
    //console.log(url)
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

export const fetchSingelProductsAction = createAsyncThunk(
  "fetchSingel/products",
  async ({ url }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const productRatingAction = createAsyncThunk(
  "prduct/rating",
  async ({ id, rating }, { rejectWithValue }) => {
    //const navigate=useNavigate()
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}review/${id}`, rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
      //navigate(`profile/orders`)
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductCntl = createAsyncThunk(
  "delete/product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseUrl}products/${id}`, {
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

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //add product
    builder.addCase(createProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //product list
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //fetach singel product
    builder.addCase(fetchSingelProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingelProductsAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSingelProductsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // product rating
    builder.addCase(productRatingAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(productRatingAction.fulfilled, (state, action) => {
      state.rating = action.payload;
      state.loading = false;
    });
    builder.addCase(productRatingAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
