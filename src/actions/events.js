import * as api from '../api/events';

export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
  return {
    type: GET_EVENTS,
    promise: api.getEvents(),
  };
};
