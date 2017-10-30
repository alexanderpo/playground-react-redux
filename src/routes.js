import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="*" component={() => (<Redirect to="/" />)} />
    </Switch>
  </Router>
);

export default AppRouter;
