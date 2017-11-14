import * as api from '../api/events';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const SUBSCRIBE_TO_EVENT = 'SUBSCRIBE_TO_EVENT';

export const getEvents = () => { // eslint-disable-line
  return {
    type: GET_EVENTS,
    promise: api.getEvents(),
  };
};

export const getEvent = (id) => { // eslint-disable-line
  return {
    type: GET_EVENT,
    promise: api.getEvent(id),
  };
};

export const subscribeEventControl = (userId, eventId) => {
  const data = { userId, eventId };
  return {
    type: SUBSCRIBE_TO_EVENT,
    promise: api.subscribeEventControl(data),
  };
};
