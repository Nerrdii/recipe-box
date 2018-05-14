import React, { Component } from "react";
import { Link } from "react-router-dom";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };
  }

  render() {
    return (
      <li className="collection-item">
        <Link to={`/recipes/${this.state.item._id}`}>
          {this.state.item.name}
        </Link>
      </li>
    );
  }
}

export default Recipe;
