import React from "react";
import {
  //BrowserRouter as Router,
  Routes,
  BrowserRouter,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Login from "./views/pages/Login";
import About from "./views/pages/About";
import NoMatch from "./views/pages/NoMatch";
import NavBar from "./views/components/Navbar";
import MainPanel from "./views/pages/MainPanel";
import client from "./utils/client";

import {
  useIsAuthenticated //,
  //useMsal,
} from "@azure/msal-react";
import { useDispatch, useStore } from 'react-redux';

import { decode as base64_decode } from 'base-64';
import { currentUserAuthenticated } from "./slices/currentUserSlice";
import { usersLoaded, usersLoading } from "./slices/usersSlice";

// Example based at: https://reactrouter.com/docs/en/v6/examples/auth
const ProtectedRoute = ({children}) => {
  
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default function App() {

  const dispatch = useDispatch();
  let user = useStore(store => store.currentUser);

  if ((user.username === undefined) && sessionStorage.getItem("current_user") !== null) {
    //console.log("User not found.")
    user = JSON.parse(
      base64_decode(sessionStorage.getItem("current_user"))
    );
    dispatch(currentUserAuthenticated(user))
  }

  //useEffect(() => {
    dispatch(usersLoading());

    client(
      "GET",
      '/users/all',
      {'Accept': 'application/json'},
      null,
      true
    )
      .then((users) => {
        if (users && users.data && users.data.length >= 0)
          dispatch(usersLoaded(users.data));
      })
      .catch(e => {      
        console.log("Failed to load users list. Error: %s", e)
        dispatch(usersLoaded([]));
      });
  //});

  return (
    <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
      <NavBar />
      <Container className="my-4">
        <Routes>
          <Route
            exact path="/"
            element={<ProtectedRoute children={<MainPanel user={user} />} />}
          />
          <Route
            path="/about"
            element={<About />} 
          />
          <Route 
            path="*"
            element={<NoMatch />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
