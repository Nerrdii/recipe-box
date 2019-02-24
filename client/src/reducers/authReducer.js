import Cookies from 'js-cookie';

import { LOGOUT } from '../actions/types';

let token = Cookies.get('token');

const initialState = token ? { loggedIn: true, token } : { loggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
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
