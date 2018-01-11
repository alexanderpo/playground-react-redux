import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
// import PublicRouteCreator from './routes/publicRouteCreator';
import PrivateRouteCreator from './routes/privateRouteCreator';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import UserDashboard from './containers/Dashboard/Index';
import Events from './containers/Events/Index';
import EventDetailsWrapper from './containers/Events/Details';
import UpcomingEvents from './containers/Events/Upcoming';
import CreateEvent from './containers/Events/Create';
import PlaygroundsPreview from './containers/Playgrounds/Index';
import PlaygroundsDetails from './containers/Playgrounds/Details';
import FavoritePlaygrounds from './containers/Playgrounds/Favorites';
import CreatePlayground from './containers/Playgrounds/Create';
import UserEvents from './containers/Events/User';

const Routes = isLoggedIn => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <App>
        <div>
          <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={true} path="/" component={<Events />} />
          <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/:userId/profile" component={<UserDashboard />} />
          <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/:userId/events" component={<UserEvents />} />

          <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={true} path="/playgrounds" component={<PlaygroundsPreview />} />
          <Switch>
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={true} path="/playgrounds/favorites" component={<FavoritePlaygrounds />} />
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/playgrounds/create" component={<CreatePlayground />} />
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/playgrounds/:playgroundId" component={<PlaygroundsDetails />} />
          </Switch>

          <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={true} path="/events" component={<Events />} />
          <Switch>
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={true} path="/events/upcoming" component={<UpcomingEvents />} />
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/events/create" component={<CreateEvent />} />
            <PrivateRouteCreator isLoggedIn={isLoggedIn} exact={false} path="/events/:eventId" component={<EventDetailsWrapper />} />
          </Switch>
        </div>
      </App>
    </Switch>
  </Router>
);

export default Routes;
