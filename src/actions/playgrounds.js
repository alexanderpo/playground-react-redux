import { createAction } from 'redux-actions';
import * as api from '../api/playgrounds';

export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS';
export const GET_PLAYGROUND = 'GET_PLAYGROUND';
export const UPDATE_PLAYGROUND_POSITION = 'UPDATE_PLAYGROUND_POSITION';
export const GET_PLAYGROUND_ADDRESS = 'GET_PLAYGROUND_ADDRESS';

export const updatePlaygroundPosition = createAction(UPDATE_PLAYGROUND_POSITION);

export const getPlaygroundAddress = (lat, lng) => ({
  type: GET_PLAYGROUND_ADDRESS,
  promise: api.getAddressByCoords(lat, lng),
});

export const getPlaygrounds = () => ({
  type: GET_PLAYGROUNDS,
  promise: api.getPlaygrounds(),
});

export const getPlayground = id => ({
  type: GET_PLAYGROUND,
  promise: api.getPlayground(id),
});
