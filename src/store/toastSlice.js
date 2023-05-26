import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
}

const toastSlice = createSlice({
  name: 'toast',
  // initialState: initialState,
  initialState,
  reducers: {

  }
})

export default toastSlice.reducer;