import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{recipe.name}</h5>
      {recipe.servings !== 0 &&
      recipe.servings !== '' &&
      recipe.servings != null ? (
        <h6 className="card-subtitle mb-2 text-muted">
          Servings: {recipe.servings}
        </h6>
      ) : null}
      <p className="card-text">{recipe.description}</p>
      <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
        Details
      </Link>
    </div>
  </div>
);

export default Recipe;
