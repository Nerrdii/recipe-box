import _ from 'lodash';
import {
  GET_RECIPES,
  GET_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case GET_RECIPE:
      return { ...state, [action.payload._id]: action.payload };
    case ADD_RECIPE:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_RECIPE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_RECIPE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
