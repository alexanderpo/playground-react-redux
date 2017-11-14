import { handle } from 'redux-pack';
import { GET_EVENT, UPDATE_SUBSCRIBERS } from '../actions/events';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENT:
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
          details: payload,
          isLoading: false,
        }),
      });
    case UPDATE_SUBSCRIBERS: {
      const { details } = state;
      const newEventState = details.map(event => ({
        ...event,
        subscribed_users: payload.subscribed_users,
        isSubscribe: payload.isSubscribe,
      }));
      return {
        ...state,
        details: newEventState,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
