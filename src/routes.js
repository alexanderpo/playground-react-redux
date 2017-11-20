import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import PublicRouteCreator from './routes/publicRouteCreator';
// import PrivateRouteCreator from './routes/privateRouteCreator';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import UserProfile from './containers/UserProfile';
import Events from './containers/Events/Index';
import EventDetailsWrapper from './containers/Events/Details';
import PlaygroundsPreview from './containers/Playgrounds/Index';
import PlaygroundsDetails from './containers/Playgrounds/Details';
import FavoritePlaygrounds from './containers/Playgrounds/Favorites';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <App>
        <div>
          <PublicRouteCreator isExact={true} path="/" component={<Events />} />
          <PublicRouteCreator isExact={false} path="/profile" component={<UserProfile />} />
          <PublicRouteCreator isExact={true} path="/playgrounds" component={<PlaygroundsPreview />} />
          <Switch>
            <PublicRouteCreator isExact={true} path="/playgrounds/favorites" component={<FavoritePlaygrounds />} />
            <PublicRouteCreator isExact={false} path="/playgrounds/:playgroundId" component={<PlaygroundsDetails />} />
          </Switch>
          <PublicRouteCreator isExact={true} path="/events" component={<Events />} />
          <PublicRouteCreator isExact={false} path="/events/:eventId" component={<EventDetailsWrapper />} />
        </div>
      </App>
    </Switch>
  </Router>
);

export default Routes;
