import React, { Component } from "react";
import Recipe from "./Recipe";
import "./css/Recipes.css";

class Recipes extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch("/api/recipes")
      .then(res => res.json())
      .then(data => {
        this.setState({ recipes: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const recipes =
      this.state.recipes.length !== 0 ? (
        <div className="recipe-container">
          {this.state.recipes.map(recipe => {
            return <Recipe key={recipe._id} item={recipe} />;
          })}
        </div>
      ) : (
        <p>No Recipes</p>
      );

    return (
      <div>
        <h1>Recipes</h1>
        {recipes}
      </div>
    );
  }
}

export default Recipes;
