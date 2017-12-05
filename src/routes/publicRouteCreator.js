import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import isLoggedIn from '../index';

const propTypes = {
  path: PropTypes.string,
  isExact: PropTypes.bool,
  component: PropTypes.object,
};

const PublicRouteCreator = ({ component, ...props }) => (
  <Route
    {...props}
    render={() => (
      !isLoggedIn ? (
        <Redirect to="/signin" />
      ) : component
    )}
  />
);

PublicRouteCreator.propTypes = propTypes;
export default withRouter(PublicRouteCreator);
