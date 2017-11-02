import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './containers/UserProfile';
import Events from './containers/Events/Index';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import App from './App';
import RouteCreator from './routeCreator';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <App>
        <div>
          <RouteCreator isExact={true} path="/" component={<Events />} />
          <RouteCreator isExact={false} path="/profile" component={<UserProfile />} />
          <RouteCreator isExact={false} path="/events" component={<Events />} />
        </div>
      </App>
    </Switch>
  </Router>
);

export default Routes;
