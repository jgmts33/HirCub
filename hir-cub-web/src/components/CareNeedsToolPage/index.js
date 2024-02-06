import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import HelpBox from '../HelpBox';

const CareNeedsToolPage = () => {
  return (
    <div class="w-full journal-entries">
      <div class="question-box">
        <h2></h2>
        <HelpBox
          firstLine="HOW TO USE THIS TOOL? FIND ANSWERS IN OUR HELP SECTION"
          hash="/help#medication"
        />
      </div>
      <div className="">
        <p>
          Consider completing Care Needs monthly, or more often if you are
          noticing frequent changes. Set reminders to complete this tool in the{' '}
          <Link className="" to="/profile/reminders">
            reminder manager
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CareNeedsToolPage;
