import { push } from 'connected-react-router';
import { LOGIN, LOGOUT } from './types';

export const login = token => async dispatch => {
  sessionStorage.setItem('token', token);
  dispatch({ type: LOGIN, payload: token });
  dispatch(push('/'));
};

export const logout = () => async dispatch => {
  sessionStorage.removeItem('token');

  dispatch({ type: LOGOUT });
};
