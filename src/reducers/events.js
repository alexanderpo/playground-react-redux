import { handle } from 'redux-pack';
import { GET_EVENTS } from '../actions/events';

const initialState = {
  // TODO: normal init state
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS:
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
          details: payload, // TODO: add isSubscribed
          isLoading: false,
        }),
      });
    default:
      return state;
  }
}
