import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './containers/UserProfile';
import Events from './containers/Events/Index';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import App from './App';
// import PrivateRouteCreator from './routes/privateRouteCreator';
import PublicRouteCreator from './routes/publicRouteCreator';

// BrowserRouter work with forceRefresh={true}
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <App>
        <div>
          <PublicRouteCreator isExact={true} path="/" component={<Events />} />
          <PublicRouteCreator isExact={false} path="/profile" component={<UserProfile />} />
          <PublicRouteCreator isExact={false} path="/events" component={<Events />} />
        </div>
      </App>
    </Switch>
  </Router>
);

export default Routes;
