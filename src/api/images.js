const responseChecker = (response) => {
  if (response.status >= 400) {
    return response.json().then(data => data);
  }
  return response.json();
};

export const createImage = data => fetch('/api/v1/images', {
  method: 'post',
  headers: {
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: data,
}).then(response => responseChecker(response));

export const removeImage = imageId => fetch(`/api/v1/images/${imageId}`, {
  method: 'delete',
  headers: {
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));
