import { GET_RECIPES, ADD_RECIPE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return [...action.payload];
    case ADD_RECIPE:
      return [...state, action.payload];
    default:
      return state;
  }
};
