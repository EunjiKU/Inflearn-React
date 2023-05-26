import { configureStore } from "@reduxjs/toolkit";
import toasReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    toast: toasReducer
  },
})