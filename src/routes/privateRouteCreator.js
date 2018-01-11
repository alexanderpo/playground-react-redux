import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

const propTypes = {
  isLoggedIn: PropTypes.object,
  component: PropTypes.object,
};

const PrivateRouteCreator = ({ isLoggedIn, component, ...props }) => (
  <Route
    {...props}
    render={() => (
      !isLoggedIn.isLoggedIn ? (
        <Redirect to="/signin" />
      ) : component
    )}
  />
);

PrivateRouteCreator.propTypes = propTypes;
export default withRouter(PrivateRouteCreator);
