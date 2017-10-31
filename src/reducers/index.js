import { combineReducers } from 'redux';
import userData from './user';

const appReducer = combineReducers({
  user: userData,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
