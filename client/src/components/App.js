import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Main />
        <div className="fixed-action-btn">
          <Link to="/recipes/add" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
