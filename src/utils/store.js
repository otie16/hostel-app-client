/*Redux Store*/
import { productsApi } from "../features/productsApi";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "../features/cartSlice";
import authReducer from "../features/authSlice";
import {loadUser} from "../features/authSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  /* Helps in caching our data */
  /*Middleware*/
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// When application loads we will dispatch our getTotal
store.dispatch(getTotals())
store.dispatch(loadUser(null))

