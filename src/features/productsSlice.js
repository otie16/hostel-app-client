/*For async thunk */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import { toast } from "react-toastify";
/*Creating object for initialstate*/
const initialState = {
  items: [],
  status: null,
  error: null,
  createStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(`${url}/products`);
    return response?.data;
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(`${url}/products`, values);
      toast.success("product created");
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      // redux toolkit uses a library called immer
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      // redux toolkit uses a library called immer
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      // redux toolkit uses a library called immer
      state.status = "failed";
      state.error = action.payload;
    },
    [productsCreate.pending]: (state, action) => {
      // redux toolkit uses a library called immer
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      // redux toolkit uses a library called immer
      state.createStatus = "success";
      state.items.push(action.payload);
    },
    [productsCreate.rejected]: (state, action) => {
      // redux toolkit uses a library called immer
      state.createStatus = "failed";
      state.error = action.payload;
    },
  },
});

/*exporting Reducer*/
export default productsSlice.reducer;
