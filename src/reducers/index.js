import { combineReducers } from 'redux';
import user from './user';
import notification from './notification';
import userEvents from './Events/user';
import allEvents from './Events/events';
import currentEvent from './Events/event';
import upcomingEvents from './Events/upcoming';
import upcomingEventsByDate from './Events/upcomingByDate';
import createEventDatetime from './Events/Create/datetime';
import selectedPlaygroundId from './Events/Create/selectedPlayground';
import allPlaygrounds from './Playgrounds/index';
import currentPlayground from './Playgrounds/playground';
import userPlaygounds from './Playgrounds/user';
import favoritePlaygrounds from './Playgrounds/favorites';
import playgroundEvents from './Playgrounds/eventsByDate';
import playgroundPosition from './Playgrounds/Create/position';
import playgroundAddress from './Playgrounds/Create/address';
import playgroundImages from './Playgrounds/Create/images';

const initialState = {
  user: {
    isLoggedIn: false,
  },
  notification: {
    show: false,
    message: '',
    type: '',
  },
  events: {},
  playgrounds: {},
};

const appReducer = combineReducers({
  user,
  notification,
  events: combineReducers({
    all: allEvents,
    upcoming: upcomingEvents,
    current: currentEvent,
    byDate: upcomingEventsByDate,
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
    eventsByDate: playgroundEvents,
    user: userPlaygounds,
    create: combineReducers({
      position: playgroundPosition,
      address: playgroundAddress,
      images: playgroundImages,
    }),
  }),
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    return initialState;
  }
  return appReducer(state, action);
};

export default rootReducer;
