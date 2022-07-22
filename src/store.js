import { configureStore } from '@reduxjs/toolkit';

import currentUserSlice from './slices/currentUserSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    devTools: process.env.NODE_ENV !== "production",
  }
});

export default store;