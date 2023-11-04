import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Header from './Header';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import RecipeDetails from './RecipeDetails';
import RedirectComponent from './RedirectComponent';
import AuthRoute from './AuthRoute';

const App = (props) => (
  <React.Fragment>
    <Header />
    <Container className="mt-4">
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <AuthRoute
          exact
          path="/recipes/add"
          component={AddRecipe}
          authenticated={props.loggedIn}
        />
        <Route path="/recipes/:id/edit" component={EditRecipe} />
        <Route path="/recipes/:id" component={RecipeDetails} />
        <Route path="/redirect" component={RedirectComponent} />
      </Switch>
    </Container>
  </React.Fragment>
);

const mapStateToProps = ({ auth }) => {
  return { loggedIn: auth.loggedIn };
};

export default withRouter(connect(mapStateToProps)(App));
