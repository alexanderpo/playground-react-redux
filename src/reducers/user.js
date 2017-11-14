import { handle } from 'redux-pack';
import _ from 'lodash';
import { SIGN_IN, UPDATE_SUBSCRIBED_EVENTS } from '../actions/user';

const initialState = {};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          isLoggedIn: false,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoggedIn: false,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          details: payload,
          isLoggedIn: !payload.error,
          isLoading: false,
        }),
      });
    case UPDATE_SUBSCRIBED_EVENTS: {
      const { details } = state;
      const eventId = action.payload;
      const { subscribedEvents } = state.details;

      const removeItem = (array, element) => {
        const index = array.indexOf(element);
        array.splice(index, 1);
      };

      if (!_.includes(subscribedEvents, eventId)) {
        subscribedEvents.push(eventId);
      } else {
        removeItem(subscribedEvents, eventId);
      }

      return {
        ...state,
        details: {
          ...details,
          subscribedEvents,
        },
      };
    }
    default:
      return state;
  }
}

// case UPDATE_SUBSCRIBED_EVENTS: {
//   const { details } = state;
//   const eventId = action.payload;
//   const { subscribedEvents } = state.details;
//
//   const removeItem = (array, element) => {
//     const index = array.indexOf(element);
//     array.splice(index, 1);
//   };
//
//   if (!_.includes(subscribedEvents, eventId)) {
//     subscribedEvents.push(eventId);
//   } else {
//     removeItem(subscribedEvents, eventId);
//   }
//
//   return {
//     ...state,
//     details: {
//       ...details,
//       subscribedEvents,
//     },
//   };
// }
