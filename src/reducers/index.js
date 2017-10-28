import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
  routing: routerReducer,
});

const rootReducer = (state, action) => (
  appReducer(state, action)
);

export default rootReducer;
