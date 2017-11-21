import { combineReducers } from 'redux';
import user from './user';
import allEvents from './Events/events';
import currentEvent from './Events/event';
import upcomingEvents from './Events/upcoming';
import allPlaygrounds from './Playgrounds/index';
import currentPlayground from './Playgrounds/playground';
import favoritePlaygrounds from './Playgrounds/favorites';

const initialState = {};

const appReducer = combineReducers({
  user,
  events: combineReducers({
    all: allEvents,
    current: currentEvent,
    upcoming: upcomingEvents,
  }),
  playgrounds: combineReducers({
    all: allPlaygrounds,
    current: currentPlayground,
    favorites: favoritePlaygrounds,
  }),
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
