import React, { Component } from 'react';
import { connect } from 'react-redux';

import Recipe from './Recipe';
import './css/Recipes.css';

import { getRecipes } from '../actions/recipesActions';

class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  renderList() {
    return this.props.recipes.map(recipe => {
      return <Recipe key={recipe._id} recipe={recipe} />;
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recipes</h1>
        {this.props.recipes.length !== 0 ? (
          <div className="recipe-container">{this.renderList()}</div>
        ) : (
          <p>No Recipes</p>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ recipes }) => {
  return { recipes: Object.values(recipes) };
};

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
