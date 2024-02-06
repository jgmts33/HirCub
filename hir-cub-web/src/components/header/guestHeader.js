import React from 'react';
import { withRouter } from 'react-router';
import { Menu, SetFontSizeButtons } from '~/components/ui';
import './styles.scss';

function GuestHeader({ history }) {
  return (
    <div
      className={`header${
        history.location.pathname === '/' ? ' main-page-header' : ''
      }`}
    >
      <div className="container">
        <SetFontSizeButtons />
        <div className="flex flex-wrap items-center row-mx-15">
          <div className="page-welcome">
            Welcome to CareHub
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default withRouter(GuestHeader);