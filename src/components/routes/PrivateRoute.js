import React from 'react';
import { object, bool, string, func, array } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import routes from '../../constants/routesPaths';

const PrivateRoute = ({ subRoutes, component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      authenticated ?
        React.createElement(component, { ...props, subRoutes }) :
        <Redirect
          to={{
            pathname: routes.login,
            state: { from: props.location }
          }}
        />
    )}
  />
);

PrivateRoute.propTypes = {
  component: func.isRequired,
  path: string.isRequired,
  authenticated: bool.isRequired,
  exact: bool,
  location: object,
  subRoutes: array
};

export default PrivateRoute;
