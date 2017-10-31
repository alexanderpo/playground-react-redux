import { createAction } from 'redux-actions';

export const SIGN_IN = 'SIGN_IN';
export const LOGOUT = 'LOGOUT';

export const logout = createAction(LOGOUT);

export const signIn = (email, password) => {
  const data = { email, password };
  return {
    type: SIGN_IN,
    payload: {
      url: 'signin',
      method: 'post',
      body: data,
    },
  };
};
