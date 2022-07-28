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
    messageRead(state) {
        return {
            ...state,
            data: state.data.filter(m => !m.secret)
        }
    }
  }
});

export const { messagesSyncing, messagesSynced, messageReceived, messageRead } = messagesSlice.actions;

export default messagesSlice.reducer;