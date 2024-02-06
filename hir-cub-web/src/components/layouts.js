import React from 'react';
import { GuestHeader, UserHeader, LandingHeader } from './header';
import Footer from './footer';
import LandingFooter from './landingFooter';

export function GuestLayout(props) {
  const { children } = props;
  return (
    <React.Fragment>
      <GuestHeader />
      {children}
      <Footer />
    </React.Fragment>
  );
}

export function UserLayout(props) {
  const { children } = props;
  return (
    <React.Fragment>
      <UserHeader />
      {children}
      <Footer />
    </React.Fragment>
  );
}

export function LandingLayout(props) {
  const { children } = props;
  return (
    <React.Fragment>
      <LandingHeader />
      {children}
      <LandingFooter />
    </React.Fragment>
  );
}
