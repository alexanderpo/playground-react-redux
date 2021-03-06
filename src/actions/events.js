import { createAction } from 'redux-actions';
import * as api from '../api/events';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const UPDATE_SUBSCRIBERS = 'UPDATE_SUBSCRIBERS';
export const UPDATE_EVENT_DATETIME = 'UPDATE_EVENT_DATETIME';
export const UPDATE_EVENT_SELECTED_PLAYGROUND = 'UPDATE_EVENT_SELECTED_PLAYGROUND';

export const updateEventDatetime = createAction(UPDATE_EVENT_DATETIME);
export const updateSubscribers = createAction(UPDATE_SUBSCRIBERS);
export const updateEventSelectedPlayground = createAction(UPDATE_EVENT_SELECTED_PLAYGROUND);

export const getEvents = () => ({
  type: GET_EVENTS,
  promise: api.getEvents(),
});

export const getEvent = id => ({
  type: GET_EVENT,
  promise: api.getEvent(id),
});

export const createEvent = (title, datetime, userId, playgroundId) => {
  const data = {
    title,
    datetime,
    userId,
    playgroundId,
  };
  return {
    type: CREATE_EVENT,
    promise: api.createEvent(data),
  };
};

export const deleteEvent = id => ({
  type: DELETE_EVENT,
  promise: api.deleteEvent(id),
});
