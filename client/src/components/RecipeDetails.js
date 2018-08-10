import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class RecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      id: '',
      name: '',
      description: '',
      servings: null,
      ingredients: [],
      directions: []
    };

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.props.match.params.id;

    this.setState({ id: id });

    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          description: data.description,
          servings: data.servings,
          ingredients: data.ingredients,
          directions: data.directions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  confirmDelete() {
    fetch(`/api/recipes/${this.state.id}`, {
      method: 'DELETE'
    }).catch(err => console.log(err));

    this.props.history.push('/');
  }

  render() {
    const ingredients = this.state.ingredients.map((ingredient, index) => {
      return (
        <li className="collection-item" key={index}>
          {ingredient}
        </li>
      );
    });

    const directions = this.state.directions.map(function(direction, index) {
      return (
        <li className="collection-item" key={index}>
          {index + 1}. {direction}
        </li>
      );
    });

    return (
      <div style={{ marginBottom: '20px' }}>
        <br />
        <Link to="/" className="btn grey">
          Back
        </Link>
        <h2>{this.state.name}</h2>
        <div style={{ fontSize: '1.2rem' }}>
          <p>{this.state.description !== '' ? this.state.description : null}</p>
          <p>
            {this.state.servings !== null && this.state.servings !== 0
              ? 'Servings: ' + this.state.servings
              : null}
          </p>
        </div>
        <h4>Ingredients</h4>
        <ul className="collection">{ingredients}</ul>
        <h4>Directions</h4>
        <ul className="collection">{directions}</ul>
        <Link
          to={{
            pathname: `/recipes/${this.props.match.params.id}/edit`,
            state: this.state
          }}
          className="btn">
          Edit
        </Link>
        <button className="btn red modal-trigger" onClick={this.confirmDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(RecipeDetails);
