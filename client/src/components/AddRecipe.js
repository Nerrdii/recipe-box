import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { addRecipe } from '../actions/recipesActions';

class AddRecipe extends Component {
  onSubmit = values => {
    this.props.addRecipe(values);
  };

  render() {
    const cancelLink = (
      <Link to="/" className="btn btn-secondary">
        Cancel
      </Link>
    );

    const initialValues = {
      name: '',
      description: '',
      servings: 0,
      ingredients: [''],
      directions: ['']
    };

    return (
      <Fragment>
        <h1 className="mt-3">Add Recipe</h1>
        <RecipeForm
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          cancelLink={cancelLink}
        />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { addRecipe }
)(AddRecipe);
