import { combineReducers } from 'redux';
import user from './user';
import userEvents from './Events/user';
import allEvents from './Events/events';
import currentEvent from './Events/event';
import upcomingEvents from './Events/upcoming';
import createEventDatetime from './Events/Create/datetime';
import selectedPlaygroundId from './Events/Create/selectedPlayground';
import allPlaygrounds from './Playgrounds/index';
import currentPlayground from './Playgrounds/playground';
import userPlaygounds from './Playgrounds/user';
import favoritePlaygrounds from './Playgrounds/favorites';
import playgroundPosition from './Playgrounds/Create/position';
import playgroundAddress from './Playgrounds/Create/address';

const initialState = {};

const appReducer = combineReducers({
  user,
  events: combineReducers({
    all: allEvents,
    upcoming: upcomingEvents,
    current: currentEvent,
    user: userEvents,
    create: combineReducers({
      datetime: createEventDatetime,
      playgroundId: selectedPlaygroundId,
    }),
  }),
  playgrounds: combineReducers({
    all: allPlaygrounds,
    current: currentPlayground,
    favorites: favoritePlaygrounds,
    user: userPlaygounds,
    create: combineReducers({
      position: playgroundPosition,
      address: playgroundAddress,
    }),
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
