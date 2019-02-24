import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/userActions';

import './css/Navbar.css';

export const Navbar = ({ logout, loggedIn }) => (
  <nav className="indigo">
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">
        Recipe Box
      </Link>
      <a data-activates="sidebar" className="button-collapse">
        <i className="material-icons">menu</i>
      </a>
      <ul className="right hide-on-med-and-down">
        {loggedIn ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        )}
        <li>
          <Link to="/">Recipes</Link>
        </li>
        {loggedIn ? (
          <li>
            <Link to="/recipes/add">Add Recipe</Link>
          </li>
        ) : null}
      </ul>
      <ul className="side-nav" id="sidebar">
        <li>
          <Link to="/">Recipes</Link>
        </li>
        {loggedIn ? (
          <li>
            <Link to="/recipes/add">Add Recipe</Link>
          </li>
        ) : null}
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
