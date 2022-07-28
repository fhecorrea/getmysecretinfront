import React /*, { useState }*/ from "react";
import {
  //BrowserRouter as Router,
  Routes,
  BrowserRouter,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Login from "./views/pages/Login";
import Chat from "./views/pages/Chat";
import Home from "./views/pages/Home";
import About from "./views/pages/About";
import NoMatch from "./views/pages/NoMatch";
import NavBar from "./views/components/Navbar";

import {
  useIsAuthenticated //,
  //useMsal,
} from "@azure/msal-react";
import { /*useSelector,*/ useDispatch, useStore } from 'react-redux';
//import { loginRequest } from "./authConfig";
//import { graphConfig } from "./authConfig";

import { decode as base64_decode } from 'base-64';
import { currentUserAuthenticated } from "./slices/currentUserSlice";

// Example based at: https://reactrouter.com/docs/en/v6/examples/auth
const ProtectedRoute = ({children}) => {
  
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default function App() {

  //const { instance, accounts } = useMsal();
  //const [graphData, setGraphData] = useState(null);
  
  const dispatch = useDispatch();
  let user = useStore(store => store.currentUser);

  console.log((user.username === undefined), (sessionStorage.getItem("current_user") !== null), !user && (sessionStorage.getItem("current_user") !== null))
  if ((user.username === undefined) && sessionStorage.getItem("current_user") !== null) {
    console.log("User not found.")
    dispatch(
      currentUserAuthenticated(
        JSON.parse(
          base64_decode(sessionStorage.getItem("current_user"))
        )
      )
    )
  }

  return (
    <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
      <NavBar />
      <Container className="my-4">
        <Routes>
          <Route
            exact path="/"
            element={<ProtectedRoute children={<Home />} />}
          />
          <Route
            path="/about"
            element={<About />} 
          />
          <Route
            path="/chat/:id"
            element={<ProtectedRoute children={<Chat />} />} 
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
