import { handle } from 'redux-pack';
import { SIGN_IN } from '../actions/user';

const initialState = {};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        failure: prevState => ({ ...prevState, error: payload, isLoading: false }),
        success: prevState => ({ ...prevState, user: payload, isLoading: false }),
      });
    default:
      return state;
  }
}
