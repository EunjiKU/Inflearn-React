import { configureStore } from "@reduxjs/toolkit";
import toasReducer from './toastSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    toast: toasReducer,
    auth: authReducer
  },
})