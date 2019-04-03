import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import API from '../api';

class RecipeDetails extends Component {
  state = {
    recipe: null
  };

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe = async () => {
    const id = this.props.match.params.id;

    const res = await API.get(`/api/recipes/${id}`);

    this.setState({ recipe: res.data });
  };

  onDelete = async () => {
    await API.delete(`/api/recipes/${this.state.recipe._id}`);
  };

  render() {
    if (!this.state.recipe) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ marginTop: '20px' }}>
        <Link to="/" className="btn grey">
          Back
        </Link>
        <h2>{this.state.recipe.name}</h2>
        <div>
          <p>{this.state.recipe.description}</p>
          <p>
            {this.state.recipe.servings !== null &&
            this.state.recipe.servings !== 0
              ? 'Servings: ' + this.state.recipe.servings
              : null}
          </p>
        </div>
        <h4>Ingredients</h4>
        <ul className="collection">
          {this.state.recipe.ingredients.map((ingredient, index) => {
            return (
              <li className="collection-item" key={index}>
                {ingredient}
              </li>
            );
          })}
        </ul>
        <h4>Directions</h4>
        <ul className="collection">
          {this.state.recipe.directions.map((direction, index) => {
            return (
              <li className="collection-item" key={index}>
                {index + 1}. {direction}
              </li>
            );
          })}
        </ul>
        {this.props.user && this.props.user._id === this.state.recipe._user ? (
          <Link
            to={{
              pathname: `/recipes/${this.state.recipe._id}/edit`,
              state: this.state
            }}
            className="btn">
            Edit
          </Link>
        ) : null}
        {this.props.user && this.props.user._id === this.state.recipe._user ? (
          <button className="btn red modal-trigger" onClick={this.onDelete}>
            Delete
          </button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { user: auth.user };
};

export default connect(mapStateToProps)(RecipeDetails);
