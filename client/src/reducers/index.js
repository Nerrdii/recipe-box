import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import recipesReducer from './recipesReducer';
import authReducer from './authReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    recipes: recipesReducer,
    auth: authReducer
  });
