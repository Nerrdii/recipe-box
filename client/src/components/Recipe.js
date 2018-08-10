import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            <Link to={`/recipes/${this.state.item._id}`}>
              {this.state.item.name}
            </Link>
          </span>
          <p>{this.state.item.description}</p>
          <p>
            {this.state.item.servings !== 0 && this.state.item.servings !== ''
              ? 'Servings: ' + this.state.item.servings
              : null}
          </p>
        </div>
      </div>
    );
  }
}

export default Recipe;
