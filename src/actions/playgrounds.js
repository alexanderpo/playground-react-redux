import * as api from '../api/playgrounds';

export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS';

export const getPlaygrounds = () => { // eslint-disable-line
  return {
    type: GET_PLAYGROUNDS,
    promise: api.getPlaygrounds(),
  };
};
