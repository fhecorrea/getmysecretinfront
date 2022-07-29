import React, { useEffect } /*, { useState }*/ from "react";
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

import {
  useIsAuthenticated //,
  //useMsal,
} from "@azure/msal-react";
import { useDispatch, useStore } from 'react-redux';

import { decode as base64_decode } from 'base-64';
import { currentUserAuthenticated } from "./slices/currentUserSlice";
import MainPanel from "./views/pages/MainPanel";
import { usersLoaded } from "./slices/usersSlice";

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

  useEffect(() => {
    dispatch(usersLoaded([
      {
        id: 'abc123',
        name: 'Outro silva',
        username: 'outro.sivla@email.com'
      },
      {
        id: '8asdu8au8',
        name: 'Santos costa',
        username: 'santosdacosta@gmail.com'
      },
      {
        id: 'gh45g4tg3vf3',
        name: 'Alemão fonseca',
        username: 'imgermanypureblood@germania.de'
      },
      {
        id: 'm8m5h4v3',
        name: 'Calebe costa',
        username: 'maisumemailgrande@server.net'
      },
      {
        id: '78980-7ym6',
        name: 'Afonso Alves',
        username: 'afonso.alves@teste.com'
      },
      {
        id: 'f3f3-90g45-qd2v3',
        name: 'Ubirajara Guimarães',
        username: 'bira@servidordeemail.com.br'
      }
    ]));
  });

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
