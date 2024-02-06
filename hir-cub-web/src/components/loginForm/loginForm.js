import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { Button } from '~/components/ui';
import { Input, Checkbox } from '~/components/ui/formControls';
import ErrorsBlock from '~/components/shared/errorsBlock';

import Loader from '../Loader';
import './styles.scss';
import { emailValidation, requiredValidation } from '~/consts/validation';

function LoginForm(props) {
  const { errors, handleSubmit } = props;
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (errors) {
      setSubmitting(false);
    }
  }, [errors]);

  const onHandleSubmit = (formData) => {
    setSubmitting(true);
    handleSubmit(formData);
  };

  return (
    <div>
      <Form onSubmit={onHandleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <div className="flex items-center">
                <i className="form-field-icon email-blue-icon fas fa-envelope" />
                <div className="w-full">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    validate={emailValidation}
                    component={Input}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="flex items-center">
                <i className="form-field-icon password-blue-icon fas fa-unlock-alt" />
                <div className="w-full">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    validate={requiredValidation}
                    component={Input}
                  />
                </div>
              </div>
            </div>
            <ErrorsBlock errors={errors} />
            <div className="text-center pt-10 signup-custom">
              <Button type="submit" disabled={isSubmitting}>
                <span>LOG IN</span>
              </Button>
            </div>
            <div className="text-center">
              {isSubmitting ? (
                <div className="text-dark-blue">Register</div>
              ) : (<>
                <Link to="/sign-up" className="text-dark-blue">
                  Register
                </Link>
              </>)}
            </div>
            <div className="flex justify-center pt-30 text-black">
              <Field
                type="checkbox"
                name="keepLoggedIn"
                value="true"
                component={Checkbox}
                disabled={isSubmitting ? 'disabled' : ''}
              >
                Keep me logged in.
              </Field>
            </div>
          </form>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
}

export default LoginForm;
