import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;

export default authSlice;
