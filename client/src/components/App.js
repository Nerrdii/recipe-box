import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import RecipeDetails from './RecipeDetails';
import RedirectComponent from './RedirectComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={RecipeList} />
            <Route exact path="/recipes/add" component={AddRecipe} />
            <Route path="/recipes/:id/edit" component={EditRecipe} />
            <Route path="/recipes/:id" component={RecipeDetails} />
            <Route path="/redirect" component={RedirectComponent} />
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
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn };
};

export default withRouter(connect(mapStateToProps)(App));
