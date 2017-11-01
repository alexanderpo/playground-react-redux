export const signIn = data => fetch('/api/v1/signin', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => {
  if (response.status >= 400) {
    return Promise.reject(response.status);
  }
  return response.json();
});

export default signIn;
// TODO: wrapper for fetch
