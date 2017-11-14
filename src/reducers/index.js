import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import currentEventDetails from './event';

const initialState = {};

const appReducer = combineReducers({
  user,
  events,
  currentEventDetails,
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
