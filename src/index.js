import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import Routes from './routes';
import reducers from './reducers';
import './styles/style.css';
import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#507299',
    accent1Color: '#DBE4FE',
  },
});

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const store = createStore(
  reducers,
  { user },
  compose(
    applyMiddleware(
      thunk,
      reduxPackMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('user', JSON.stringify(state.user));
  localStorage.setItem('token', JSON.stringify(state.user.details ? state.user.details.token : ''));
});

const { isLoggedIn } = store.getState().user;
export default isLoggedIn;

const Entry = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <Entry />,
  document.getElementById('root'),
);
injectTapEventPlugin();
registerServiceWorker();
