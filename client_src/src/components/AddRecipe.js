import React, { Component } from 'react';
import IngredientInput from './IngredientInput';
import DirectionInput from './DirectionInput';

class AddRecipe extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: 1,
      directions: 1
    };

    this.addIngredientInput = this.addIngredientInput.bind(this);
    this.addDirectionInput = this.addDirectionInput.bind(this);
  }

  addIngredientInput() {
    this.setState({
      ingredients: this.state.ingredients + 1
    });
  }

  addDirectionInput() {
    this.setState({
      directions: this.state.directions + 1
    });
  }

  createIngredientInputs() {
    let inputs = [];

    for (let i = 0; i < this.state.ingredients; i++) {
      inputs.push(<IngredientInput key={i} />);
    }

    return inputs;
  }

  createDirectionInputs() {
    let inputs = [];

    for (let i = 0; i < this.state.directions; i++) {
      inputs.push(<DirectionInput key={i} />);
    }

    return inputs;
  }

  render() {
    return (
      <div>
        <h1>Add Recipe</h1>
        <div className="input-field">
          <input type="text" name="name" ref="name"/>
          <label htmlFor="name">Name</label>
        </div>
        {this.createIngredientInputs()}
        <div className="input-field">
          <button className="btn-flat right" onClick={this.addIngredientInput}>New Ingredient</button>
        </div>
        {this.createDirectionInputs()}
        <div className="input-field">
          <button className="btn-flat right" onClick={this.addDirectionInput}>New Direction</button>
        </div>
        <button className="btn waves-effect waves-light right indigo darken-4" type="submit">Add
          <i className="material-icons right">add</i>
        </button>
      </div>
    );
  }
}

export default AddRecipe;
