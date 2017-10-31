import { handle } from 'redux-pack';
import { SIGN_IN } from '../actions/user';

const initialState = {};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${SIGN_IN}_LOADING`:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isLoading: true,
          error: null,
        }),
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({ ...prevState, error: payload }),
        success: prevState => ({ ...prevState, user: payload }),
      });
    default:
      return state;
  }
}
