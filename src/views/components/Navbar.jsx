import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logoff from "./buttons/LogoffButton";

import { 
    AuthenticatedTemplate
} from '@azure/msal-react';
import { useStore } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {

  const user = useStore(store => store.currentUser);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link className='navbar-brand' to="/">{process.env.REACT_APP_NAME ?? "???"}</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/about">Sobre</NavLink>
          </Nav>
          <AuthenticatedTemplate>
            <Nav>
              <span className='text-light' title={`Logado como ${user.name} (${user.username})`}>
                Olá, {user.name}!
              </span>
            </Nav>
            <Nav>
              <Logoff />
            </Nav>
          </AuthenticatedTemplate>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
  );
};

export default NavBar;