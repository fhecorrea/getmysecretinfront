import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './slices/currentUserSlice';
import usersReducer from './slices/usersSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    messages: messagesReducer,
    users: usersReducer,
    devTools: process.env.NODE_ENV !== "production",
  }
});

export default store;