import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Recipes from "./Recipes";
import About from "./About";
import AddRecipe from "./AddRecipe";
import EditRecipe from "./EditRecipe";
import RecipeDetails from "./RecipeDetails";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Recipes} />
          <Route exact path="/about" component={About} />
          <Route exact path="/recipes/add" component={AddRecipe} />
          <Route path="/recipes/:id/edit" component={EditRecipe} />
          <Route path="/recipes/:id" component={RecipeDetails} />
        </Switch>
      </main>
    );
  }
}

export default Main;
