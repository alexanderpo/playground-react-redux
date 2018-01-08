import { UPDATE_UPLOADED_IMAGES } from '../../../actions/playgrounds';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_UPLOADED_IMAGES:
      return payload;
    default:
      return state;
  }
}
