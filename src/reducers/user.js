import { handle } from 'redux-pack';
import {
  SIGN_IN,
  SUBSCRIBE_TO_EVENT,
  ADD_TO_FAVORITE_PLAYGROUND,
  UPDATE_PROFILE,
  UPDATE_PROFILE_IMAGE,
  GET_ORGANISED_EVENTS,
} from '../actions/user';

const initialState = {
  isLoggedIn: false,
};

export default function (state = initialState, action) {
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
    case SUBSCRIBE_TO_EVENT:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          details: { ...state.details, subscribedEvents: action.payload.subscribedEvents },
          isLoading: false,
        }),
      });
    case ADD_TO_FAVORITE_PLAYGROUND:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          details: { ...state.details, favoritePlaygrounds: action.payload.favoritePlaygrounds },
          isLoading: false,
        }),
      });
    case UPDATE_PROFILE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoading: false,
        }),
        success: prevState => (
          action.payload.error ? {
            ...prevState,
            isLoading: false,
            error: action.payload.error,
          } : {
            ...prevState,
            details: {
              ...state.details,
              name: action.payload.name,
              email: action.payload.email,
              phone: action.payload.phone,
              hash: action.payload.hash,
            },
            isLoading: false,
          }),
      });
    case UPDATE_PROFILE_IMAGE:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          details: {
            ...state.details,
            image: action.payload.image,
          },
          isLoading: false,
        }),
      });
    case GET_ORGANISED_EVENTS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({
          ...prevState,
          error: payload,
          isLoading: false,
        }),
        success: prevState => ({
          ...prevState,
          details: {
            ...state.details,
            createdEvents: action.payload.count,
          },
          isLoading: false,
        }),
      });
    default:
      return state;
  }
}
