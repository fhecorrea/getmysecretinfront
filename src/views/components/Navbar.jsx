import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import Logoff from "../components/buttons/Logoff";

const NavBar = () => {

  let authenticatedUser = useSelector(state => state.currentUser);
  let isAuthenticated = authenticatedUser && authenticatedUser.id && authenticatedUser.id > 0;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link className='navbar-brand' to="/">Get My Secr🔐t</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/about">Sobre</NavLink>
          </Nav>
          <Nav>
            {
              isAuthenticated 
              ? (
                  <Logoff />
                ) 
              : ""
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
  );
};

export default NavBar;