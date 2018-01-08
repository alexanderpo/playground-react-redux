import { createAction } from 'redux-actions';
import * as api from '../api/playgrounds';

export const GET_PLAYGROUNDS = 'GET_PLAYGROUNDS';
export const GET_PLAYGROUND = 'GET_PLAYGROUND';
export const UPDATE_PLAYGROUND_POSITION = 'UPDATE_PLAYGROUND_POSITION';
export const GET_PLAYGROUND_ADDRESS = 'GET_PLAYGROUND_ADDRESS';
export const CREATE_PLAYGROUNT = 'CREATE_PLAYGROUNT';
export const DELETE_PLAYGROUND = 'DELETE_PLAYGROUND';
export const UPDATE_UPLOADED_IMAGES = 'UPDATE_UPLOADED_IMAGES';

export const updatePlaygroundPosition = createAction(UPDATE_PLAYGROUND_POSITION);
export const updateUploadedImages = createAction(UPDATE_UPLOADED_IMAGES);

export const getPlaygroundAddress = (lat, lng) => ({
  type: GET_PLAYGROUND_ADDRESS,
  promise: api.getAddressByCoords(lat, lng),
});

export const getPlaygrounds = () => ({
  type: GET_PLAYGROUNDS,
  promise: api.getPlaygrounds(),
});

export const getPlayground = id => ({
  type: GET_PLAYGROUND,
  promise: api.getPlayground(id),
});

export const deletePlayground = id => ({
  type: DELETE_PLAYGROUND,
  promise: api.deletePlayground(id),
});

// eslint-disable-next-line
export const createPlayground = (name, description, address, images, latitude, longitude, creator, createdBy) => {
  const data = {
    name,
    description,
    address,
    images,
    latitude,
    longitude,
    creator,
    createdBy,
  };
  return {
    type: CREATE_PLAYGROUNT,
    promise: api.createPlayground(data),
  };
};
