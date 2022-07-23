import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { loading: false, data: [] },
  reducers: {
    usersLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    usersLoaded(state, action) {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
  }
});

export const { usersLoading, usersLoaded } = usersSlice.actions;

export default usersSlice.reducer;