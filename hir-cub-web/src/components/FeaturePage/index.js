import React from 'react';
import './styles.scss';

import { HashLink } from 'react-router-hash-link';

import { ReactComponent as Medication } from '~/assets/svg/Medication.svg';
import { ReactComponent as Library } from '~/assets/svg/Library.svg';
import { ReactComponent as Notes } from '~/assets/svg/Notes.svg';
import { ReactComponent as Expenses } from '~/assets/svg/Expenses.svg';
import { ReactComponent as Health } from '~/assets/svg/Health.svg';
import { ReactComponent as Calendar } from '~/assets/svg/Calendar.svg';
import { ReactComponent as SharedAccess } from '~/assets/svg/SharedAccess.svg';
import { ReactComponent as Heart } from '~/assets/svg/Heart.svg';

import useAppState from '~/appState';

const reports = [
  {
    title: 'Medication tracker',
    img: <Medication />,
    imgLink: '/img/landing/medication.png',
    link: 'medication',
  },
  {
    title: 'Symptom tracker',
    img: <Health />,
    imgLink: '/img/landing/symptom_tracker.png',
    link: 'symptom',
  },
  {
    title: 'Reports',
    img: <Heart />,
    imgLink: '/img/landing/reports.png',
    link: 'reports',
  },
  {
    title: 'Finance tracker',
    img: <Expenses />,
    imgLink: '/img/landing/finance_tracker.png',
    link: 'finance',
  },
  {
    title: 'Library',
    img: <Library />,
    imgLink: '/img/landing/library.png',
    link: 'library',
  },
  {
    title: 'Calendar',
    img: <Calendar />,
    imgLink: '/img/landing/calendar.png',
    link: 'calendar',
  },
  {
    title: 'My notes (journal)',
    img: <Notes />,
    imgLink: '/img/landing/notes.png',
    link: 'journal',
  },
  {
    title: 'Shared access',
    img: <SharedAccess />,
    imgLink: '/img/landing/shared_access.png',
    link: 'shared',
  },
];

const FeaturePage = () => {
  const {
    global: { userId },
  } = useAppState();

  return (
    <div className="feature-page-style">
      <section className="features-detail">
        <div className="container">
          <h1>Features</h1>
          <div className="feature-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Quis ipsum
              suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan lacus vel facilisis.
            </p>
          </div>
          <div className="feature-list">
            {reports.map((report, idx) => (
              <div className="feature-item" key={report.title + idx}>
                <HashLink className="nav-link" to={`#${report.link}`}>
                  <div className="intro-box">
                    <div className="icon">{report.img}</div>
                    <div className="title">{report.title}</div>
                  </div>
                </HashLink>
              </div>
            ))}
          </div>
          {reports.map((report, idx) => (
            <div
              className="feature-intro"
              key={idx + 'feature-intro'}
              id={report.link}
            >
              <div className="description">
                <h2>{report.title}</h2>
                <p>
                  Two intro/summary sentences for each component likely no
                  longer than this content here. And then another sentence here
                  like this that is likely no longer than this sentence here.
                </p>
                <ul>
                  <li>
                    Another highlight bullet point here with no more than
                    this many words
                  </li>
                  <li>
                    Another highlight bullet point here with no more than
                    this many words
                  </li>
                  <li>
                    Another highlight bullet point here with no more than
                    this many words
                  </li>
                  <li>
                    Another highlight bullet point here with no more than
                    this many words
                  </li>
                </ul>
              </div>

              <div className="image">
                <img src={report.imgLink} alt="" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {!userId && (
        <div className="container">
          <section className="call-to-action">
            <h3>Call to action text to Create your personal CareHub now</h3>
            <div className="create-account-btn featured-btn">
              <a href="/sign-up" target="__blank">
                Create your personal CareHub
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FeaturePage;
