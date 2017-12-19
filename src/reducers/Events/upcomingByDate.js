import { handle } from 'redux-pack';
import { GET_UPCOMING_EVENTS_BY_DATE } from '../../actions/user';

const initialState = {
  details: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_UPCOMING_EVENTS_BY_DATE:
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
