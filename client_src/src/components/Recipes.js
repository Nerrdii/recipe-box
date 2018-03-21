import React, { Component } from "react";
import Recipe from "./Recipe";
import API_ROOT from "./api";

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch(`${API_ROOT}/recipes`)
      .then(res => res.json())
      .then(data => {
        this.setState({ recipes: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const recipes = this.state.recipes.map(recipe => {
      return <Recipe key={recipe.id} item={recipe} />;
    });

    return (
      <div>
        <h1>Recipes</h1>
        <ul className="collection">{recipes}</ul>
      </div>
    );
  }
}

export default Recipes;
