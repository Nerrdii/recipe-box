import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => (
  <div className="card">
    <div className="card-content">
      <span className="card-title">{recipe.name}</span>
      <p>Description: {recipe.description}</p>
      <p>
        {recipe.servings !== 0 &&
        recipe.servings !== '' &&
        recipe.servings != null
          ? 'Servings: ' + recipe.servings
          : null}
      </p>
    </div>
    <div className="card-action">
      <Link to={`/recipes/${recipe._id}`}>Details</Link>
    </div>
  </div>
);

export default Recipe;
