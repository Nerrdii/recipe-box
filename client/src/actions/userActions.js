import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import { LOGIN, LOGOUT } from './types';

export const login = token => async dispatch => {
  sessionStorage.setItem('token', token);
  dispatch({ type: LOGIN, payload: { token, user: getUser(token) } });
  dispatch(push('/'));
};

export const logout = () => async dispatch => {
  sessionStorage.removeItem('token');

  dispatch({ type: LOGOUT });
};

const getUser = token => jwtDecode(token).user;
