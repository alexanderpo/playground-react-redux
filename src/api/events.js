const responseChecker = (response) => {
  if (response.status >= 400) {
    return response.json().then(data => data);
  }
  return response.json();
};

export const getEvents = () => fetch('/api/v1/events', {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));

export const createEvent = data => fetch('/api/v1/events', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));
