import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import logsReducer from "./slices/logsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    logs: logsReducer,
  },
});
