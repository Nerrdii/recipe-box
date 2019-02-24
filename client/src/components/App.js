import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import RecipeDetails from './RecipeDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Recipes} />
              <Route exact path="/recipes/add" component={AddRecipe} />
              <Route path="/recipes/:id/edit" component={EditRecipe} />
              <Route path="/recipes/:id" component={RecipeDetails} />
            </Switch>
          </div>
          {this.props.loggedIn ? (
            <div className="fixed-action-btn">
              <Link to="/recipes/add" className="btn-floating btn-large red">
                <i className="large material-icons">add</i>
              </Link>
            </div>
          ) : null}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn };
};

export default connect(mapStateToProps)(App);
