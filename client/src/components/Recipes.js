import React, { Component } from 'react';
import Recipe from './Recipe';
import './css/Recipes.css';

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      initialRecipes: [],
      recipes: []
    };

    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        this.setState({ initialRecipes: data });
        this.setState({ recipes: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterList(e) {
    let updatedList = this.state.initialRecipes;

    updatedList = updatedList.filter(recipe => {
      return (
        recipe.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ recipes: updatedList });
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
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input
            type="text"
            id="searchTerm"
            onChange={this.filterList}
            placeholder="Search..."
          />
        </div>
        {recipes}
      </div>
    );
  }
}

export default Recipes;
