import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Recipe Box
          </Link>
          <a data-activates="sidebar" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li>
              <Link to="/recipes/add">Add Recipe</Link>
            </li>
          </ul>
          <ul className="side-nav" id="sidebar">
            <li>
              <Link to="/">Recipes</Link>
            </li>
            <li>
              <Link to="/recipes/add">Add Recipe</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
