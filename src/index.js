import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import AppRouter from './routes';
import reducers from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#507299',
    accent1Color: '#DBE4FE',
  },
});

const store = createStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
injectTapEventPlugin();
registerServiceWorker();
