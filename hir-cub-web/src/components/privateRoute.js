import React from 'react';
import { Route, Redirect } from 'react-router';
import useAppState from '~/appState';

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const {
    account: { isAuthenticated },
  } = useAppState();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
