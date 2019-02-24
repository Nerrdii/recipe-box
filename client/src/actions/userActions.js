import Cookies from 'js-cookie';

import { LOGOUT } from './types';

export const logout = () => async dispatch => {
  Cookies.remove('token');

  dispatch({ type: LOGOUT });
};
