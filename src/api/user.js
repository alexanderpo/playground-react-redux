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
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

export const signUp = data => fetch('/api/v1/signup', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(response => responseChecker(response));

// TODO: wrapper for fetch
