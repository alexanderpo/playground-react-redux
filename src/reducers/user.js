import { handle } from 'redux-pack';
// import _ from 'lodash';
import { SIGN_IN, SUBSCRIBE_TO_EVENT, ADD_TO_FAVORITE_PLAYGROUND } from '../actions/user';

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
    default:
      return state;
  }
}
