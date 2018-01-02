import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      ingredients: [],
      directions: []
    };
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:3000/api/recipes/${id}`).then((response) => {
      this.setState({
        name: response.data.name,
        ingredients: response.data.ingredients,
        directions: response.data.directions
      }, () => {
        console.log(this.state.ingredients);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const ingredients = this.state.ingredients.map((ingredient, index) => {
      return <li className="collection-item" key={index}>{ingredient}</li>;
    });

    const directions = this.state.directions.map(function(direction, index) {
      return <li className="collection-item" key={index}>{index + 1}. {direction}</li>;
    });

    return (
      <div>
        <br/>
        <Link to="/" className="btn grey">Back</Link>
        <h2>{this.state.name}</h2>
        <h4>Ingredients</h4>
        <ul className="collection">{ingredients}</ul>
        <h4>Directions</h4>
        <ul className="collection">{directions}</ul>
      </div>
    );
  }
}

export default RecipeDetails;
