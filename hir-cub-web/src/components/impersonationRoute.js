import React from 'react';
import { Route, Redirect } from 'react-router';

import useAppState from '~/appState';
import { ImpersonationAllowedURLs } from '~/consts';

function ImpersonationRoute(props) {
  const { component: Component, ...rest } = props;
  const {
    permissions: { isImpersonationMode },
  } = useAppState();

  const pathname =
    window.location.pathname && window.location.pathname.split('/')[1];
  const isValidImpersonationURL = ImpersonationAllowedURLs.includes(pathname);

  return (
    <Route
      {...rest}
      render={(props) =>
        isValidImpersonationURL ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/welcome',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default ImpersonationRoute;
