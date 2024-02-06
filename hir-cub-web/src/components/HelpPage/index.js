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

const helpItems = [
  {
    title: 'Medication tracker',
    img: <Medication />,
    link: 'medication',
  },
  {
    title: 'Symptom tracker',
    img: <Health />,
    link: 'symptom',
  },
  {
    title: 'Reports',
    img: <Heart />,
    link: 'reports',
  },
  {
    title: 'Finance tracker',
    img: <Expenses />,
    link: 'finance',
  },
  {
    title: 'Library',
    img: <Library />,
    link: 'library',
  },
  {
    title: 'Calendar',
    img: <Calendar />,
    link: 'calendar',
  },
  {
    title: 'My notes (journal)',
    img: <Notes />,
    link: 'journal',
  },
  {
    title: 'Shared access',
    img: <SharedAccess />,
    link: 'shared',
  },
  {
    title: 'Care Needs Tool',
    img: <Medication />,
    link: 'careNeedsTool',
  },
];

const HelpPage = () => {
  return (
    <div className="help-page-style">
      <div className="container">
        <h1>Help section</h1>
        <div className="help-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </div>
        <div className="help-list">
          {helpItems.map((item, idx) => (
            <div className="help-item" key={item.title + idx}>
              <HashLink className="nav-link" to={`#${item.link}`}>
                <div className="intro-box">
                  <div className="icon">{item.img}</div>
                  <div className="title">{item.title}</div>
                </div>
              </HashLink>
            </div>
          ))}
        </div>
        {helpItems.map((item, idx) => (
          <div className="help-intro" key={idx + 'help-intro'} id={item.link}>
            <div className="description">
              <h2>{item.title}</h2>
              <p>
                Two intro/summary sentences for each component likely no longer
                than this content here. And then another sentence here like this
                that is likely no longer than this sentence here.
              </p>
              <ul>
                <li>
                  Another highlight bullet point here with no more than this
                  many words
                </li>
                <li>
                  Another highlight bullet point here with no more than this
                  many words
                </li>
                <li>
                  Another highlight bullet point here with no more than this
                  many words
                </li>
                <li>
                  Another highlight bullet point here with no more than this
                  many words
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
