import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import API_ROOT from "./api";

class RecipeDetails extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
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

    fetch(`${API_ROOT}/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          ingredients: data.ingredients,
          directions: data.directions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  confirmDelete() {
    fetch(`${API_ROOT}/recipes/${this.state.id}`, {
      method: "DELETE"
    }).catch(err => console.log(err));

    this.props.history.push(`/`);
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
      <div>
        <br />
        <Link to="/" className="btn grey">
          Back
        </Link>
        <h2>{this.state.name}</h2>
        <h4>Ingredients</h4>
        <ul className="collection">{ingredients}</ul>
        <h4>Directions</h4>
        <ul className="collection">{directions}</ul>
        <Link
          to={{
            pathname: `/recipes/${this.props.match.params.id}/edit`,
            state: this.state
          }}
          className="btn"
        >
          Edit
        </Link>
        <button className="btn red" onClick={this.confirmDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(RecipeDetails);
