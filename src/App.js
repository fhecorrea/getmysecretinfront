import React from "react";
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
import { useSelector } from 'react-redux';
import NavBar from "./views/components/Navbar";

//import logo from './logo.svg';
//import './App.css';

const ProtectedRoute = ({children}) => {
  
  // Example: https://reactrouter.com/docs/en/v6/examples/auth

  let authenticatedUser = useSelector(state => state.currentUser);
  let isAuthenticated = authenticatedUser && authenticatedUser.id && authenticatedUser.id > 0;

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default function App() {

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
