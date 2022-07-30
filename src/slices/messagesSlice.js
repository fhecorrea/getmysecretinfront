import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { loading: false, data: [] },
  reducers: {
    messagesSyncing(state) {
      return {
        ...state,
        loading: true
      }
    },
    messagesSynced(state, action) {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    },
    messageReceived(state, action) {
        return {
            ...state,
            loading: false,
            data: [...state.data, action.payload]
        }
    },
    messageRead(state, action) {
        return {
            ...state,
            loading: false,
            data: action.payload
        }
    }
  }
});

export const { messagesSyncing, messagesSynced, messageReceived, messageRead } = messagesSlice.actions;

export default messagesSlice.reducer;