import React, { Component } from 'react';
import axios from 'axios';

import Recipe from './Recipe';
import './css/Recipes.css';

class Recipes extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = async () => {
    const res = await axios.get('/api/recipes');

    this.setState({ recipes: res.data });
  };

  renderList() {
    return this.state.recipes.map(recipe => {
      return <Recipe key={recipe._id} recipe={recipe} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Recipes</h1>
        {this.state.recipes.length !== 0 ? (
          <div className="recipe-container">{this.renderList()}</div>
        ) : (
          <p>No Recipes</p>
        )}
      </div>
    );
  }
}

export default Recipes;
