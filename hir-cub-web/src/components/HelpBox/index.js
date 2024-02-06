import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './styles.scss';

const HelpBox = (props) => {
  const { title, firstLine, secondLine, hash } = props;

  return (
    <div className="question-box">
      {title && <h2>{title}</h2>}
      <div className="help-box">
        <div>
          <span className="text-help-desc">{firstLine}</span>
          {secondLine && (
            <>
              <br />
              <span className="text-help-desc">{secondLine}</span>
            </>
          )}
        </div>
        <div className="box-button-help">
          <HashLink to={hash} className="button-help">
            <img src="/img/icons/icon-help.png" alt="" />
            <span>HELP</span>
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default HelpBox;
