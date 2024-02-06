import React from 'react';
import { withRouter } from 'react-router';
import useAppState from '~/appState';
import { Link } from 'react-router-dom';

import SocialLinks from '~/components/socialLinks/index.js';

import './styles.scss';

const LandingHeader = ({ history }) => {
  const {
    global: { userId },
  } = useAppState();

  return (
    <div
      className={`header${
        // history.location.pathname === '/' ? ' main-page-header' : ''
        ' landing-header'
      }`}
    >
      <div className="helpful-links">
        <div className="container inner-wrapper">
          <div className="text-links">
            <div className="link-item">
              <a href="/about-us">About CareHub</a>
            </div>
            <div className="link-item">
              <a href="/help">Help Section</a>
            </div>
            <div className="link-item">
              <a href="/features">Features</a>
            </div>
            <div className="link-item">
              <a href="#">For Healthcare Providers</a>
            </div>
            <div className="link-item">
              <a href="mailto:carehub@virtualhospice.ca">Contact us</a>
            </div>
          </div>
          <SocialLinks isHeader />
        </div>
      </div>
      <div className="container">
        <div className="logo-login">
          <div className="logo">
            <Link className="logo" to="/">
              <img src="/img/header/logo-header.png" alt="" />
              <div className="short-tagline">
                Short tagline will go here like this
              </div>
            </Link>
          </div>
          <div className="login-signup">
            <div className="login-signup-buttons">
              {!userId && (
                <button className="signup">
                  <a href="/sign-up">
                    Create your personal CareHub
                    <i class="fas fa-chevron-right" />
                  </a>
                </button>
              )}

              <button className="login">
                <a href={userId ? '/welcome' : '/login'}>
                  {userId ? 'View my CareHub' : 'Login'}
                  <i class="fas fa-chevron-right" />
                </a>
              </button>
            </div>
            {/* )} */}
            <img src="/img/header/logo-canadian.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bottom-line"></div>
    </div>
  );
};

export default withRouter(LandingHeader);
