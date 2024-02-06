import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '~/appState';
import { setBasicInfo } from '~/actions/global';
import { useSuggestions } from '~/hooks';
import IntakeManagerCaregiverFormStep1 from './intakeManagerCaregiverFormStep1';
import IntakeManagerCaregiverFormStep2 from './intakeManagerCaregiverFormStep2';
import IntakeManagerCaregiverFormStep3 from './intakeManagerCaregiverFormStep3';
import IntakeManagerCaregiverFormStep4 from './intakeManagerCaregiverFormStep4';
import { step1Validation } from './validation';
import { useSubmitIntakeManagerInfoRequest } from '~/hooks/requests';
import FormWizard from '~/components/formWizard';
import { FormContextProvider } from '~/utils/formState';
import Loader from '../Loader';
import './styles.scss';

function IntakeManagerCaregiverForm() {
  const dispatch = useAppDispatch(0);
  const {
    suggestions,
    addedSuggestions,
    handleAddSuggestions,
  } = useSuggestions();
  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, sendRequest } = useSubmitIntakeManagerInfoRequest(
    handleSubmitSuccess
  );
  function handleSubmitSuccess(res, formData) {
    dispatch(setBasicInfo({ caredName: formData.caredName }));
    setSubmitting(false);
  }
  function handleSubmit(formData) {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    sendRequest(formData);
  }

  useEffect(() => {
    setSubmitting(false);
  }, [errors]);

  return (
    <React.Fragment>
      <div className="intake-caregiver-form">
        <div className="form-title">My Profile</div>
        <div className="form-description">
          Please tell us a bit about you and the person you are caring for so
          that we can taper this app to your needs. Only the questions with a
          "*" are mandatory.
        </div>

        <FormWizard
          initialValues={{ mainIssues: [''], minorIssues: [''] }}
          onSubmit={handleSubmit}
          serverErrors={errors}
          FormContextProvider={FormContextProvider}
          suggestions={suggestions}
          addedSuggestions={addedSuggestions}
          addSuggestion={handleAddSuggestions}
        >
          <FormWizard.Page stepIndex={1}>
            <IntakeManagerCaregiverFormStep1 validate={step1Validation} />
          </FormWizard.Page>
          <FormWizard.Page stepIndex={2}>
            <IntakeManagerCaregiverFormStep2 />
          </FormWizard.Page>
          <FormWizard.Page stepIndex={3}>
            <IntakeManagerCaregiverFormStep3 />
          </FormWizard.Page>
          <FormWizard.Page stepIndex={4}>
            <IntakeManagerCaregiverFormStep4 />
          </FormWizard.Page>
        </FormWizard>
      </div>
      {isSubmitting && <Loader />}
    </React.Fragment>
  );
}

export default IntakeManagerCaregiverForm;
