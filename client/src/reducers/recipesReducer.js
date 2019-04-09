import {
  GET_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return [...action.payload];
    case GET_RECIPE:
      return [...state, action.payload];
    case ADD_RECIPE:
      return [...state, action.payload];
    case UPDATE_RECIPE:
      return state.map(recipe => {
        if (recipe._id === action.payload._id) {
          return { ...recipe, ...action.payload };
        }

        return recipe;
      });
    case DELETE_RECIPE:
      return state.filter(r => r._id !== action.payload);
    default:
      return state;
  }
};
