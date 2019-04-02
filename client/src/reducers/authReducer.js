import { LOGIN, LOGOUT } from '../actions/types';

let token = sessionStorage.getItem('token');

const initialState = token ? { loggedIn: true, token } : { loggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        token: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: null
      };
    default:
      return state;
  }
};
