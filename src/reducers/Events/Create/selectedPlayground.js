import { UPDATE_EVENT_SELECTED_PLAYGROUND } from '../../../actions/events';

const initialState = 0;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_EVENT_SELECTED_PLAYGROUND:
      return payload;
    default:
      return state;
  }
}
