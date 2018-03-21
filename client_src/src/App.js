import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Main />
        </div>
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
