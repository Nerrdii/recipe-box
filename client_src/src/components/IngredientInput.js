import React, { Component } from 'react';

class IngredientInput extends Component {
  render() {
    return (
      <div className="input-field">
        <input type="text" name="ingredient" ref="ingredient"/>
        <label htmlFor="ingredient">Ingredient</label>
      </div>
    );
  }
}

export default IngredientInput;
