import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import isLoggedIn from '../index';

const propTypes = {
  path: PropTypes.string,
  isExact: PropTypes.bool,
  component: PropTypes.object,
};

const PublicRouteCreator = ({ path, isExact, component }) => (
  <Route
    exact={isExact}
    path={path}
    render={() => (
      !isLoggedIn ? (
        <Redirect to="/signin" />
      ) : component
    )}
  />
);

PublicRouteCreator.propTypes = propTypes;
export default PublicRouteCreator;