import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUsersError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setUsersLoading,
  setUsers,
  setUsersError,
} = userSlice.actions;

export default userSlice.reducer;
