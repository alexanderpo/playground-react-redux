const responseChecker = (response) => {
  if (response.status >= 400) {
    return response.json().then(data => data);
  }
  return response.json();
};

export const getPlaygrounds = () => fetch('/api/v1/playgrounds', {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));

export const getPlayground = id => fetch(`/api/v1/playgrounds/${id}`, {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));

export const getAddressByCoords = (lat, lng) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBYJGAFqDYFPxPyX39sGmdHMWhKpNoDcf4`, {
  method: 'get',
}).then(response => responseChecker(response));
