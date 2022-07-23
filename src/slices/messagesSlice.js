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
            data: state.data.push(action.payload)
        }
    },
    messageRead(state, action) {
        return {
            ...state,
            data: state.data.filter(m => m.id.toString() !== action.payload.toString())
        }
    }
  }
});

export const { messagesSyncing, messagesSynced, messageReceived, messageRead } = messagesSlice.actions;

export default messagesSlice.reducer;