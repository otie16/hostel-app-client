import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { configureStore } from "@reduxjs/toolkit";
// import { productsApi } from "./features/productsApi";
// import cartReducer from "./features/cartSlice";

/*Dispatching our action*/
// store.dispatch(productsFetch());
// store.dispatch(getTotals());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: ps://bit.ly/CRA-vitals
reportWebVitals();
