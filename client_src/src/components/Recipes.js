import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';

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
    axios.get('http://localhost:3000/api/recipes').then((response) => {
      this.setState({recipes: response.data});
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const recipes = this.state.recipes.map((recipe) => {
      return (
        <Recipe key={recipe.id} item={recipe}/>
      )
    });

    return (
      <div>
        <h1>Recipes</h1>
        <ul className="collection">
          {recipes}
        </ul>
      </div>
    );
  }
}

export default Recipes;
