import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/userActions';

export const Header = ({ logout, loggedIn, user }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link to="/" className="navbar-brand">
      Recipe Box
    </Link>
    <Navbar.Toggle aria-controls="mobileNavbar" />
    <Navbar.Collapse id="mobileNavbar">
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to="/" className="nav-link">
            Recipes
          </Link>
        </Nav.Item>
        {loggedIn ? (
          <Nav.Item>
            <Link to="/recipes/add" className="nav-link">
              Add Recipe
            </Link>
          </Nav.Item>
        ) : null}
      </Nav>
      <Nav className="ml-auto">
        {loggedIn ? (
          <NavDropdown b title={`Welcome ${user.name}`}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Item>
            <a href="/auth/google" className="btn btn-danger">
              Sign in with Google
            </a>
          </Nav.Item>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn, user: auth.user };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
