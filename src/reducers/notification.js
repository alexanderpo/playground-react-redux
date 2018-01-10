import { UPDATE_NOTIFICATION_STATUS } from '../actions/user';

const initialState = {
  show: false,
  message: '',
  type: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NOTIFICATION_STATUS:
      return payload;
    default:
      return state;
  }
}
