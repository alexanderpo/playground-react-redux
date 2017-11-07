import { combineReducers } from 'redux';
import user from './user';

const initialState = {
  user: {
    isLoggedIn: false,
  },
};

const appReducer = combineReducers({
  user,
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user');
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
