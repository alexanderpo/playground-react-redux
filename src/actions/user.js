import { createAction } from 'redux-actions';
import * as api from '../api/user';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const LOGOUT = 'LOGOUT';
export const SUBSCRIBE_TO_EVENT = 'SUBSCRIBE_TO_EVENT';
export const ADD_TO_FAVORITE_PLAYGROUND = 'ADD_TO_FAVORITE_PLAYGROUND';
export const GET_FAVORITE_PLAYGROUNDS = 'GET_FAVORITE_PLAYGROUNDS';
export const GET_UPCOMING_EVENTS = 'GET_UPCOMING_EVENTS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';

export const logout = createAction(LOGOUT);

export const signIn = (email, password) => {
  const data = { email, password };
  return {
    type: SIGN_IN,
    promise: api.signIn(data),
  };
};

export const signUp = (name, email, password, rePassword) => {
  const data = {
    name,
    email,
    password,
    rePassword,
  };
  return {
    type: SIGN_UP,
    promise: api.signUp(data),
  };
};

export const updateProfile = (id, name, phone, image, password, isPasswordChange) => {
  const data = {
    id,
    name,
    phone,
    image,
    password,
    isPasswordChange,
  };
  return {
    type: UPDATE_PROFILE,
    promise: api.updateProfile(data),
  };
};

export const subscribeEventControl = (userId, eventId) => {
  const data = { userId, eventId };
  return {
    type: SUBSCRIBE_TO_EVENT,
    promise: api.subscribeEventControl(data),
  };
};

export const favoritePlaygroundControl = (userId, playgroundId) => {
  const data = { userId, playgroundId };
  return {
    type: ADD_TO_FAVORITE_PLAYGROUND,
    promise: api.favoritePlaygroundControl(data),
  };
};

export const getFavoritePlaygrounds = id => ({
  type: GET_FAVORITE_PLAYGROUNDS,
  promise: api.getFavoritePlaygrounds(id),
});

export const getUpcomingEvents = id => ({
  type: GET_UPCOMING_EVENTS,
  promise: api.getUpcomingEvents(id),
});

export const getUserEvents = id => ({
  type: GET_USER_EVENTS,
  promise: api.getUserEvents(id),
});
