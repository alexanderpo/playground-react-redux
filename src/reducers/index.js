import { combineReducers } from 'redux';
import user from './user';

const appReducer = combineReducers({
  user,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
