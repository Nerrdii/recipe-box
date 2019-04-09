import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipe, deleteRecipe } from '../actions/recipesActions';

class RecipeDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
  }

  onDelete = () => {
    this.props.deleteRecipe(this.props.recipe._id);
  };

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div className="mt-4">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <h2 className="mt-3">{recipe.name}</h2>
        <p>Description: {recipe.description}</p>
        <p>
          {recipe.servings !== null && recipe.servings !== 0
            ? 'Servings: ' + recipe.servings
            : null}
        </p>
        <h4>Ingredients</h4>
        <ul className="list-group mb-4">
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <li className="list-group-item" key={index}>
                {ingredient}
              </li>
            );
          })}
        </ul>
        <h4>Directions</h4>
        <ul className="list-group">
          {recipe.directions.map((direction, index) => {
            return (
              <li className="list-group-item" key={index}>
                {index + 1}. {direction}
              </li>
            );
          })}
        </ul>
        {this.props.user && this.props.user._id === recipe._user ? (
          <div className="mt-3">
            <Link
              to={{
                pathname: `/recipes/${recipe._id}/edit`,
                state: this.props.recipe
              }}
              className="btn btn-primary mr-3">
              Edit
            </Link>
            <button className="btn btn-danger" onClick={this.onDelete}>
              Delete
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, recipes }, ownProps) => {
  return {
    user: auth.user,
    recipe: recipes[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, deleteRecipe }
)(RecipeDetails);
