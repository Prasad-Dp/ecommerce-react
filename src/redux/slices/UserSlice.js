import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../utils/url";

const initialState = {
  register: {
    loading: false,
    error: null,
    userInfo: {},
  },
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
    users: [],
  },
};

export const loginAction = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //console.log(email,password)
      const response = await axios.post(`${baseUrl}users/login`, {
        email,
        password,
      });
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      if (response.data.user.isAdmin) {
        localStorage.setItem("admin", true);
      }
      return response.data;
    } catch (error) {
      //console.log(error)
      toast.error(error.response.data.message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const registerAction = createAsyncThunk(
  "user/rgister",
  async (
    { name, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}users/register`, {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const shippingAddressAction = createAsyncThunk(
  "user/rgister",
  async (
    { name, phone, address, city, state, pincode, country },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}users/address`,
        { name, phone, address, city, state, pincode, country },
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

export const getUserAction = createAsyncThunk(
  "get/user",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}users/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsersListAction = createAsyncThunk(
  "get/userlist",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UsersSlice = new createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //for login
    builder.addCase(loginAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    //registeration
    builder.addCase(registerAction.pending, (state, action) => {
      state.register.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.register.userInfo = action.payload;
      state.register.loading = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.register.error = action.payload;
      state.register.loading = false;
    });
    //get user data
    builder.addCase(getUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    //get all users
    builder.addCase(getUsersListAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(getUsersListAction.fulfilled, (state, action) => {
      state.userAuth.users = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(getUsersListAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
  },
});

const userReducer = UsersSlice.reducer;

export default userReducer;
