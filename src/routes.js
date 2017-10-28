import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="*" component={() => (<Redirect to="/" />)} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
