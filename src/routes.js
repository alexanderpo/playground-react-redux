import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);

export default AppRouter;
// <Route path="*" component={() => (<Redirect to="/" />)} />
