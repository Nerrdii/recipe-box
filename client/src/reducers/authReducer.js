import jwtDecode from 'jwt-decode';
import { LOGIN, LOGOUT } from '../actions/types';

const token = sessionStorage.getItem('token');
const user = token ? jwtDecode(token).user : null;

const initialState = token
  ? { loggedIn: true, token, user }
  : { loggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
};
