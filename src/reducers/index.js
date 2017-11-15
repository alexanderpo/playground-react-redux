import { combineReducers } from 'redux';
import user from './user';
import events from './Events/events';
import currentEventDetails from './Events/event';
import playgrounds from './Playgrounds/index';

const initialState = {};

const appReducer = combineReducers({
  user,
  events,
  playgrounds,
  currentEventDetails,
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
