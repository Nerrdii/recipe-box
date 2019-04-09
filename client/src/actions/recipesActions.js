import { push } from 'connected-react-router';
import API from '../api';
import {
  GET_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE
} from './types';

export const getRecipes = () => async dispatch => {
  const res = await API.get('/api/recipes');

  dispatch({ type: GET_RECIPES, payload: res.data });
};

export const getRecipe = id => async dispatch => {
  const res = await API.get(`/api/recipes/${id}`);

  dispatch({ type: GET_RECIPE, payload: res.data });
};

export const addRecipe = recipe => async dispatch => {
  const res = await API.post('/api/recipes', recipe);

  dispatch({ type: ADD_RECIPE, payload: res.data });
  dispatch(push('/'));
};

export const updateRecipe = (id, recipe) => async dispatch => {
  const res = await API.put(`/api/recipes/${id}`, recipe);

  dispatch({ type: UPDATE_RECIPE, payload: res.data });
  dispatch(push(`/recipes/${id}`));
};

export const deleteRecipe = id => async dispatch => {
  await API.delete(`/api/recipes/${id}`);

  dispatch({ type: DELETE_RECIPE, payload: id });
  dispatch(push('/'));
};
