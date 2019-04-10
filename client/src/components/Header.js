import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../actions/userActions';

export const Header = ({ logout, loggedIn }) => (
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
        <Nav.Item>
          {loggedIn ? (
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          ) : (
            <a href="/auth/google" className="btn btn-danger">
              Sign in with Google
            </a>
          )}
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
