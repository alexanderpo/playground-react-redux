import { handle } from 'redux-pack';
import { GET_EVENT } from '../actions/events';

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
    default:
      return state;
  }
}
