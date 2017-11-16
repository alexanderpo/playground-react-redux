import * as api from '../api/playgrounds';

export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS';
export const GET_PLAYGROUND = 'GET_PLAYGROUND';

export const getPlaygrounds = () => ({
  type: GET_PLAYGROUNDS,
  promise: api.getPlaygrounds(),
});

export const getPlayground = id => ({
  type: GET_PLAYGROUND,
  promise: api.getPlayground(id),
});
