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

export const authenticateUser = (username, password, isAdmin = false) => async (dispatch) => {

  console.log("Chegou a função de autenticação...");
  await setTimeout(
    () => dispatch(
      currentUserAuthenticated({
        id: 1,
        username: username,
        isAdmin: isAdmin
      })
    ), 
    1000
  );
};

export default currentUserSlice.reducer;