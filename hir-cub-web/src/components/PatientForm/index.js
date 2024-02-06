import React, { useRef } from 'react';
import PatientEditor from '../PatientEditor';
import PatientEntries from '../PatientEntries';

import './styles.scss';

function PatientForm(props) {
  const childRef = useRef();
  const reRunAPIs = () => {
    childRef.current.reRunAPIs();
  };

  return (
    <React.Fragment>
      <div className="patient-form">
        <div className="patient-form-title">My Patients</div>
        <div className="patient-form-description">
          Does your patient already have CareHub account? Please ask them to
          share access with you.
        </div>
        <PatientEditor reRunAPIs={reRunAPIs}/>
        <PatientEntries ref={childRef}/>
      </div>
    </React.Fragment>
  );
}

export default PatientForm;
