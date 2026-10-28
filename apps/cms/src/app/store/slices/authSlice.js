import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('access_token');
let initialUser = null;
try {
  const storedUser = localStorage.getItem('user_info');
  if (storedUser) {
    initialUser = JSON.parse(storedUser);
  }
} catch (e) {
  initialUser = null;
}

const initialState = {
  token: token || null,
  user: initialUser,
  isAuthenticated: Boolean(token),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoginSuccess: (state, action) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('user_info', JSON.stringify(action.payload.user));
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
    },
  },
});

export const {
  setAuthLoading,
  setLoginSuccess,
  setAuthError,
  clearAuthError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
