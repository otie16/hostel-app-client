import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

// const registerStatus = createAction("registerStatus");

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  role: "",
  isAdmin: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

//Registering our user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      //Making our post request and awaiting our token
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

//Logging in our user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      //Making our post request and awaiting our token
      const token = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      //Decoding the encrypted jwt
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
          isAdmin: user.isAdmin,
          userLoaded: true,
        };
      }
    },
    //Logging out a user
    logoutUser(state, action) {
      //Removes the user token from localstorage
      localStorage.removeItem("token");

      return {
        //Resetting the state to default
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        role: "",
        isAdmin: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    // Register functionality
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        //Decoding the encrypted jwt
        const user = jwtDecode(action.payload);
        //Return user data to the frontend
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
          isAdmin: user.isAdmin,
          registerStatus: "success",
          userLoaded: true,
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    //Login functionality
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        //Decoding the encrypted jwt
        const user = jwtDecode(action.payload);
        //Return user data to the frontend
        return {
          ...state,
          isAdmin: user.isAdmin,
          token: action.payload,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
          loginStatus: "success",
          userLoaded: true,
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
