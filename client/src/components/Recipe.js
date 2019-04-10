import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Recipe = ({ recipe }) => (
  <Card>
    <Card.Body>
      <Card.Title>{recipe.name}</Card.Title>
      {recipe.servings !== 0 &&
      recipe.servings !== '' &&
      recipe.servings != null ? (
        <Card.Subtitle className="mb-2 text-muted">
          Servings: {recipe.servings}
        </Card.Subtitle>
      ) : null}
      <Card.Text>{recipe.description}</Card.Text>
      <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
        Details
      </Link>
    </Card.Body>
  </Card>
);

export default Recipe;
