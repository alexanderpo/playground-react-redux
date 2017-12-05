import * as api from '../api/images';

export const CREATE_IMAGE = 'CREATE_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const createImage = (file) => {
  const data = new FormData();
  data.append('image', file);
  data.append('originalName', file.name);

  return {
    type: CREATE_IMAGE,
    promise: api.createImage(data),
  };
};

export const removeImage = imageId => ({
  type: REMOVE_IMAGE,
  promise: api.removeImage(imageId),
});
