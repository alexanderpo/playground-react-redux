import { combineReducers } from 'redux';
import user from './user';
import userEvents from './Events/user';
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
    upcoming: upcomingEvents,
    current: currentEvent,
    user: userEvents,
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
