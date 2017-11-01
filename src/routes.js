import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import UserProfile from './containers/UserProfile';
import Events from './containers/Events/Index';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Events} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/events" component={Events} />
    </Switch>
  </Router>
);

export default AppRouter;
// <Route path="*" component={() => (<Redirect to="/" />)} />
