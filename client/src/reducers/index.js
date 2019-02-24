import { combineReducers } from 'redux';

import recipesReducer from './recipesReducer';
import authReducer from './authReducer';

export default combineReducers({
  recipes: recipesReducer,
  auth: authReducer
});
