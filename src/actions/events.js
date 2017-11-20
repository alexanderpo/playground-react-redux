import { createAction } from 'redux-actions';
import * as api from '../api/events';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const UPDATE_SUBSCRIBERS = 'UPDATE_SUBSCRIBERS';

export const updateSubscribers = createAction(UPDATE_SUBSCRIBERS);

export const getEvents = () => ({
  type: GET_EVENTS,
  promise: api.getEvents(),
});

export const getEvent = id => ({
  type: GET_EVENT,
  promise: api.getEvent(id),
});
