import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import AppRouter from './routes';
import reducers from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#507299',
    accent1Color: '#DBE4FE',
  },
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunk,
      reduxPackMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const Entry = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App>
        <AppRouter />
      </App>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <Entry />,
  document.getElementById('root'),
);
injectTapEventPlugin();
registerServiceWorker();
