import { UPDATE_PLAYGROUND_POSITION } from '../../../actions/playgrounds';

const initialState = {
  latitude: '',
  longitude: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PLAYGROUND_POSITION:
      return payload;
    default:
      return state;
  }
}
