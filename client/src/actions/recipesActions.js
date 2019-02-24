import axios from 'axios';

import { GET_RECIPES, ADD_RECIPE } from './types';

export const getRecipes = () => async dispatch => {
  const res = await axios.get('/api/recipes');

  dispatch({ type: GET_RECIPES, payload: res.data });
};

export const addRecipe = recipe => async dispatch => {
  const res = await axios.post('/api/recipes', recipe);

  dispatch({ type: ADD_RECIPE, payload: res.data });
};
