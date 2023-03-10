/*For Redux toolkit query*/
import { url } from "./api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi" /*API service name in product*/,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hostel-app-api.onrender.com/api/",
  })
  /* setting a base URL for fetching our data*/,
  /* All our queries go here*/
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } =
  productsApi; /*useGetAllProductsQuery hook that can be called anywhere*/
