import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import PublicRouteCreator from './routes/publicRouteCreator';
// import PrivateRouteCreator from './routes/privateRouteCreator';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import UserProfile from './containers/UserProfile';
import Events from './containers/Events/Index';
import EventDetails from './containers/Events/Details';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <App>
        <div>
          <PublicRouteCreator isExact={true} path="/" component={<Events />} />
          <PublicRouteCreator isExact={false} path="/profile" component={<UserProfile />} />
          <PublicRouteCreator isExact={true} path="/events" component={<Events />} />
          <PublicRouteCreator isExact={false} path="/events/:eventId" component={<EventDetails />} />
        </div>
      </App>
    </Switch>
  </Router>
);

export default Routes;
