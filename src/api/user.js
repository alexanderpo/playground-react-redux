const responseChecker = (response) => {
  if (response.status >= 400) {
    return response.json().then(data => data);
  }
  return response.json();
};

export const signIn = data => fetch('/api/v1/signin', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const signUp = data => fetch('/api/v1/signup', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const updateProfileImage = data => fetch(`/api/v1/users/${data.userId}/image`, {
  method: 'put',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const updateProfile = data => fetch(`/api/v1/users/${data.id}`, {
  method: 'put',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const subscribeEventControl = data => fetch('/api/v1/users/events/subscribe', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const favoritePlaygroundControl = data => fetch('/api/v1/users/favorite/playground', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const getFavoritePlaygrounds = id => fetch(`/api/v1/users/${id}/favorite/playgrounds`, {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));

export const getUpcomingEvents = id => fetch(`/api/v1/users/${id}/events/upcoming`, {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));

export const getUserEvents = id => fetch(`/api/v1/users/${id}/events`, {
  method: 'get',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
  },
}).then(response => responseChecker(response));
