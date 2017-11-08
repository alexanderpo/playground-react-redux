import { combineReducers } from 'redux';
import user from './user';
import events from './events';

const initialState = {
  user: {
    isLoggedIn: false,
  },
};

const appReducer = combineReducers({
  user,
  events,
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
