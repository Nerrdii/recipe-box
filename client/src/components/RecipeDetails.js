import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../actions/recipesActions';

class RecipeDetails extends Component {
  onDelete = () => {
    this.props.deleteRecipe(this.props.recipe._id);
  };

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ marginTop: '20px' }}>
        <Link to="/" className="btn grey">
          Back
        </Link>
        <h2>{recipe.name}</h2>
        <div>
          <p>Description: {recipe.description}</p>
          <p>
            {recipe.servings !== null && recipe.servings !== 0
              ? 'Servings: ' + recipe.servings
              : null}
          </p>
        </div>
        <h4>Ingredients</h4>
        <ul className="collection">
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <li className="collection-item" key={index}>
                {ingredient}
              </li>
            );
          })}
        </ul>
        <h4>Directions</h4>
        <ul className="collection">
          {recipe.directions.map((direction, index) => {
            return (
              <li className="collection-item" key={index}>
                {index + 1}. {direction}
              </li>
            );
          })}
        </ul>
        {this.props.user && this.props.user._id === recipe._user ? (
          <Link
            to={{
              pathname: `/recipes/${recipe._id}/edit`,
              state: this.state
            }}
            className="btn">
            Edit
          </Link>
        ) : null}
        {this.props.user && this.props.user._id === recipe._user ? (
          <button className="btn red modal-trigger" onClick={this.onDelete}>
            Delete
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, recipes }, ownProps) => {
  return {
    user: auth.user,
    recipe: recipes.find(r => r._id === ownProps.match.params.id)
  };
};

export default connect(
  mapStateToProps,
  { deleteRecipe }
)(RecipeDetails);
