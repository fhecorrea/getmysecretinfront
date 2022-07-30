import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    /*
    currentUserLoading(state, action) {
      return {
        ...state,
        isLoading: true
      }
    },
    */
    currentUserAuthenticated(state, action) {
      //console.log(action);
      return {
        ...state,
        ...action.payload
      };
    },
    currentUserUpdated(state, action) {
      //const todo = state.find(todo => todo.id === action.payload)
      //todo.completed = !todo.completed
    },
    currentUserLogout(state) {
      return {};
    }
  }
});

export const { 
  currentUserAuthenticated,
  currentUserAuthenticatedUpdated,
  currentUserLogout
} = currentUserSlice.actions;

export default currentUserSlice.reducer;