import { combineReducers } from 'redux';
import user from './user';
import events from './Events/events';
import currentEvent from './Events/event';
import playgrounds from './Playgrounds/index';
import currentPlayground from './Playgrounds/playground';

const initialState = {};

const appReducer = combineReducers({
  user,
  events,
  currentEvent,
  playgrounds,
  currentPlayground,
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
