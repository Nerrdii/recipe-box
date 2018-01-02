import React, { Component } from 'react';

class DirectionInput extends Component {
  render() {
    return (
      <div className="input-field">
        <input type="text" name="direction" ref="direction"/>
        <label htmlFor="direction">Direction</label>
      </div>
    );
  }
}

export default DirectionInput;
