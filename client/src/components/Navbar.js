import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

export const Navbar = ({ logout, loggedIn }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to="/" className="navbar-brand">
      Recipe Box
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#mobileNavbar"
      aria-controls="mobileNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="mobileNavbar">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Recipes
          </Link>
        </li>
        {loggedIn ? (
          <li className="nav-item">
            <Link to="/recipes/add" className="nav-link">
              Add Recipe
            </Link>
          </li>
        ) : null}
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {loggedIn ? (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            <a href="/auth/google" className="btn btn-danger">
              Sign in with Google
            </a>
          )}
        </li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
