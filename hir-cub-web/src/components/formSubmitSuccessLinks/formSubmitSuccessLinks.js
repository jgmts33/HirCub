import React from 'react';
import { AccountType } from '~/consts';
import useAppState from '~/appState';
import { Link } from 'react-router-dom';
import './styles.scss';

function FormSubmitSuccessLinks({ children }) {
  const {
    global: { caredName, accountType },
  } = useAppState();
  const trackHealthText =
    accountType === AccountType.Patient
      ? 'my health'
      : caredName
      ? `${caredName}'s health`
      : 'health of the person I care for';
  return (
    <React.Fragment>
      {children}
      <div className="modal-submit-links">
        <div className="page-panel-group-container">
          <div className="page-panel-group py-40">
            <ul className="pl-10 text-orange">
              <li className="sm-mb-30 m-xs-mb-10">
                <Link to="/library" className="iconed-link text-black text-lg">
                  Show me resources selected for me so far
                </Link>
              </li>
              <li className="sm-mb-30 m-xs-mb-10">
                <Link to="/library" className="iconed-link text-black text-lg">
                  Show me resources in my area
                </Link>
              </li>
              <li className="sm-mb-30 m-xs-mb-10">
                <Link
                  to="/profile/caregiving-needs"
                  className="iconed-link text-black text-lg"
                >
                  What are my caregiving needs
                </Link>
              </li>
              <li className="mb-10">
                <Link
                  to="/health-tracker"
                  className="iconed-link text-black text-lg"
                >
                  I’m ready to track {trackHealthText}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FormSubmitSuccessLinks;
