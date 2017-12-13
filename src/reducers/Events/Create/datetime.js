import { UPDATE_EVENT_DATETIME } from '../../../actions/events';

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_EVENT_DATETIME:
      return payload;
    default:
      return state;
  }
}
