import { createAction } from 'redux-actions';
import * as api from '../api/user';

export const SIGN_IN = 'SIGN_IN';
export const LOGOUT = 'LOGOUT';

export const logout = createAction(LOGOUT);

export const signIn = (email, password) => {
  const data = { email, password };
  return {
    type: SIGN_IN,
    promise: api.signIn(data),
  };
};
