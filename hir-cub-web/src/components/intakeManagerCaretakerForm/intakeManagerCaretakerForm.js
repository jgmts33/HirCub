import React, { useEffect, useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import IntakeManagerCaretakerFormStep1 from './intakeManagerCaretakerFormStep1';
import { step1Validation } from './validation';
import { useSubmitIntakeManagerInfoRequest } from '~/hooks/requests';
import { FormContextProvider } from '~/utils/formState';
import './styles.scss';
import { Form } from 'react-final-form';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import { Button } from '../ui';
import { showAddedPrompt } from '~/actions/global';
import Loader from '../Loader';
import { GetValuesFromLocal, SetValuesToLocal } from '~/consts/global';

const focusOnError = createDecorator();
const decorators = [focusOnError];

function IntakeManagerCaretakerForm() {
  const appState = useAppState();
  const dispatch = useAppDispatch();

  const [values, setValues] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, sendRequest } = useSubmitIntakeManagerInfoRequest(
    handleSubmitSuccess
  );
  function handleSubmitSuccess() {
    dispatch(showAddedPrompt(true));
    setSubmitting(false);
  }
  const handleSubmit = (formData) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);

    if (formData && formData instanceof Object) {
      var obj = formData;
      delete obj['mainIssues'];
      delete obj['minorIssues'];

      SetValuesToLocal(appState, 'intakeCaretaker', obj);
    }
    sendRequest(formData);
  };

  const getValuesFromLocal = () => {
    let value = GetValuesFromLocal(appState, 'intakeCaretaker');
    if (value) {
      setValues(value);
    }
  };

  useEffect(() => {
    getValuesFromLocal();
  }, []);
  
  useEffect(() => {
    setSubmitting(false);
  }, [errors]);

  return (
    <React.Fragment>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        initialValues={{ mainIssues: [''], minorIssues: [''], ...values }}
        validate={step1Validation}
        onSubmit={handleSubmit}
        decorators={decorators}
      >
        {({ handleSubmit, submitting, values, touched, errors }) => {
          return (
            <FormContextProvider
              values={values}
              errors={errors}
              touched={touched}
            >
              <form className="intake-form" onSubmit={handleSubmit}>
                <div className="form-title">My Profile</div>
                <div className="form-description">
                  The information you provide will help the CareHub provide
                  resources that might be helpful to you. The information you
                  choose to enter is up to you.
                </div>

                <IntakeManagerCaretakerFormStep1
                  validate={step1Validation}
                  stepIndex={1}
                />
                <div className="submit-button">
                  <Button type="submit" kind="purpure" disabled={submitting}>
                    <i className="fas fa-lock" />
                    Save
                  </Button>
                </div>
              </form>
            </FormContextProvider>
          );
        }}
      </Form>
      {isSubmitting && <Loader />}
    </React.Fragment>
  );
}

export default IntakeManagerCaretakerForm;
