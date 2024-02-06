import React from 'react';
import useAppState from '~/appState';
import { AccountType } from '~/consts';
import IntakeManagerCaregiverForm from '~/components/intakeManagerCaregiverForm';
import IntakeManagerCaretakerForm from '~/components/intakeManagerCaretakerForm';

function IntakeManager() {
  const {
    global: { accountType },
  } = useAppState();
  return (
    <div className="intake-manager-page page-has-separate-bg md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="inner-page-container">
        {accountType === AccountType.CareGiver ? (
          <IntakeManagerCaregiverForm />
        ) : (
          <IntakeManagerCaretakerForm />
        )}
      </div>
    </div>
  );
}

export default IntakeManager;
