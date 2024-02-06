import React, { useEffect } from 'react';
import useAppState from '~/appState';
import './style.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Welcome } from '~/assets/svg/Welcome.svg';

// helpers
import { trackGTM } from '~/utils';

// constants
import { TRACK_GTM, AccountType } from '~/consts';
import HowDoingForm from './howDoingForm';
import { GetName } from '~/consts/global';

const DashboardWelcome = () => {
  const {
    global: { userId, accountType },
  } = useAppState();

  const myName = GetName();

  useEffect(() => {
    trackGTM(TRACK_GTM.ACCESS_WELCOME, {
      userId,
    });
  }, [userId]);

  return (
    <div>
      <div className="small-content-header">
        <div className="welcome-box">
          <Welcome />
          Welcome
        </div>
        <div className="">
          <a href="#" className="forums-button btn-purpure">
            <img src="/img/icons/forums.svg" alt="" />
            discussion forums
          </a>
        </div>
      </div>
      <div className="content-header">
        <div className="">
          <h2>Good Morning {myName}!</h2>
        </div>
        <div className="desktop-mode">
          <a href="#" className="forums-button btn-purpure">
            <img src="/img/icons/forums.svg" alt="" />
            discussion forums
          </a>
        </div>
      </div>
      <div className="content-box">
        <div className="introduction-box">
          <h4>How are you and your caregiving doing?</h4>
          <p>
            Introduction content goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco. Include a link to{' '}
            <a className="link" href="#">
              Journal/Notes
            </a>
          </p>
        </div>
        <div className="video-box">
          {accountType != AccountType.Patient && (
            <React.Fragment>
              <hr className="horizontal-line"></hr>
              <div className="video-item">
                <h2>Taking care of yourself as a caregiver</h2>
                <div className="video-flex">
                  <div>
                    <iframe
                      src="https://player.vimeo.com/video/39499044?h=921fb1a866&title=0&byline=0&portrait=0"
                      width="360"
                      height="210"
                      frameBorder="0"
                      allow="fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p>
                      <a href="#" className="link">
                        Taking care of yourself as a caregiver video
                      </a>
                    </p>
                  </div>
                  <div className="video-desc">
                    <p>
                      Here are some way to take Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco
                    </p>
                    <p>
                      For additional videos ... go to your{' '}
                      <a className="link" href="#">
                        Library
                      </a>
                    </p>
                  </div>
                </div>
                <hr className="horizontal-line"></hr>
                <div className="video-item">
                  <h2>Taking care of yourself as a caregiver</h2>
                  <div className="video-flex">
                    <div>
                      <iframe
                        src="https://player.vimeo.com/video/39499044?h=921fb1a866&title=0&byline=0&portrait=0"
                        width="360"
                        height="210"
                        frameBorder="0"
                        allow="fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <p>
                        <a href="#" className="link">
                          Taking care of yourself as a caregiver video
                        </a>
                      </p>
                    </div>
                    <div className="video-desc">
                      <p>
                        Here are some way to take Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco
                      </p>
                      <p>
                        For additional videos ... go to your{' '}
                        <a className="link" href="#">
                          Library
                        </a>
                      </p>
                    </div>
                  </div>
                  <hr className="horizontal-line"></hr>
                </div>
                <div className="video-item">
                  <h2>Taking care of yourself as a caregiver</h2>
                  <div className="video-flex">
                    <div>
                      <iframe
                        src="https://player.vimeo.com/video/39499044?h=921fb1a866&title=0&byline=0&portrait=0"
                        width="360"
                        height="210"
                        frameBorder="0"
                        allow="fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <p>
                        <a href="#" className="link">
                          Taking care of yourself as a caregiver video
                        </a>
                      </p>
                    </div>
                    <div className="video-desc">
                      <p>
                        Here are some way to take Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco
                      </p>
                      <p>
                        For additional videos ... go to your{' '}
                        <a className="link" href="#">
                          Library
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {accountType != AccountType.Patient && (
            <>
              <HowDoingForm />

              <hr className="horizontal-line" />

              <div className="understanding-needs-box">
                <h2>Understanding your caregiving needs</h2>
                <p className="content-desc">
                  View or update your caregiver needs assessment to help us
                  provide resources for you.
                  <Link
                    className="btn -blue-btn"
                    to="/profile/caregiving-needs"
                  >
                    View or update
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
