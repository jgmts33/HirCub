import React, { Suspense } from 'react';
import { Route } from 'react-router';
import useAppState from '~/appState';
import PrivateRoute from '~/components/privateRoute';
import { GuestLayout, LandingLayout, UserLayout } from '~/components/layouts';

function AppRoute(props) {
  const {
    account: { isAuthenticated },
  } = useAppState();
  const {
    component: Component,
    isPublic,
    location,
    keepGuestLayout,
    isLandingPage,
    ...rest
  } = props;

  const Layout = isLandingPage
    ? LandingLayout
    : (isAuthenticated && !keepGuestLayout)
      ? UserLayout
      : GuestLayout;

  if (isAuthenticated) {
    if (location.pathname == '/login' || location.pathname == '/sign-up') {
      window.location = '/welcome';
    }
  }
  return (
    <Layout location={location}>
      <Suspense fallback={<div>Loading...</div>}>
        {isPublic ? (
          <Route {...rest} render={(props) => <Component {...props} />} />
        ) : (
          <PrivateRoute component={Component} {...rest} />
        )}
      </Suspense>
    </Layout>
  );
}

export default AppRoute;
