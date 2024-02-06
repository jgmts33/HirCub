import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Input, Checkbox } from '~/components/ui/formControls';
import { Button } from '~/components/ui';
import ErrorsBlock from '~/components/shared/errorsBlock';
import Loader from '../Loader';
import { emailMustMatchValidator } from '~/consts/validation';
import './styles.scss';
import { AccountType } from '~/consts';
import { postCreatePatientRequest } from '~/requests/sharedAccess';

const PatientEditor = (props) => {
  const { initialValues } = props;
  const [passOpen, setPassOpen] = useState(false);
  const [confirmPassOpen, setConfirmPassOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverErrors, setSeverErrors] = useState(null);
  const [isNoEmail, setNoEmail] = useState(false);

  const handleSubmit = (formData) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    setSeverErrors(null);

    // make json for createPatient api
    let profileValues = {
      displayName: formData.displayName,
      postalCode: formData.postalCode,
      email: formData.email,
      password: formData.password,
      accountType: AccountType.Patient,
      noEmailAddress: isNoEmail,
    };

    postCreatePatientRequest(profileValues)
      .then((res) => {
        setSubmitting(false);
        reRunAllAPIs();
        window.location.reload();
      })
      .catch((err) => {
        setSeverErrors(err);
        console.error('err', err);
        setSubmitting(false);
      });
  };

  const handleCheck = () => {
    setNoEmail(!isNoEmail);
  };

  const reRunAllAPIs = () => {
    if (props.reRunAPIs) {
      props.reRunAPIs();
    }
  };

  const renderInputField = (icon, name, placeholder) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <span>
            <i className={`form-field-icon email-blue-icon fas fa-${icon}`} />
          </span>
          <div className="w-full">
            <Field
              type="text"
              name={name}
              placeholder={placeholder}
              component={Input}
              autoComplete="off"
              autofill="off"
              disabled={isNoEmail}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPasswordField = (name, placeholder, isOpen, onClick, other) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <span>
            <i
              className={`form-field-icon password-blue-icon fas fa-${isOpen ? 'lock' : 'eye'
                }`}
              onClick={() => onClick(!isOpen)}
              role="button"
              tabIndex="0"
            />
          </span>
          <div className="w-full">
            <Field
              type={isOpen ? 'input' : 'password'}
              name={name}
              placeholder={placeholder}
              component={Input}
              autoComplete="off"
              autofill="off"
              disabled={isNoEmail}
            />
          </div>
          {other}
        </div>
      </div>
    );
  };

  const renderCheckbox = () => {
    return (
      <div className="form-group one-line">
        <div className="flex items-center">
          <i className="form-field-icon" />
          <div className="w-full">
            <Field
              type="checkbox"
              name="checkNoEmail"
              component={Checkbox}
              checked={isNoEmail}
              onClick={() => handleCheck()}
              disabled={isSubmitting ? 'disabled' : ''}
            >
              This patient does not have email address
            </Field>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="patient_editor-form">
      <hr />
      <h2 className="patient_editor-title">Add a patient</h2>
      <div className="patient_editor-description">lorem ipsum</div>
      <Form
        onSubmit={handleSubmit}
        validate={emailMustMatchValidator}
        initialValues={initialValues}
      >
        {({ handleSubmit, submitting, touched, errors }) => (
          <form onSubmit={handleSubmit} className="page-panel-group-container">
            {renderInputField('user-circle', 'displayName', 'Display Name')}
            {renderInputField('map-marker-alt', 'postalCode', 'Postal Code')}
            {renderInputField('envelope', 'email', 'Your Email')}
            {renderInputField('envelope', 'confirmEmail', 'Confirm the Email')}

            {renderPasswordField(
              'password',
              'Create a Password',
              passOpen,
              setPassOpen
            )}

            {renderPasswordField(
              'confirmPassword',
              'Confirm the Password',
              confirmPassOpen,
              setConfirmPassOpen
            )}

            {renderCheckbox()}

            <ErrorsBlock errors={serverErrors} />
            <div className="patient_btn-custom">
              <Button type="submit" disabled={isSubmitting}>
                <span>Create and Impersonate</span>
              </Button>
            </div>
          </form>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
};

export default PatientEditor;
