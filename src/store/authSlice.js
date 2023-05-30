import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      localStorage.setItem('isLoggedIn', 'yes');
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;