import React, { useRef, useEffect } from 'react';
import { Field } from 'react-final-form';
import useFormState from '~/utils/formState';
import { Radio } from '~/components/ui/formControls';

function IntakeManagerCaregiverFormStep4() {
  const { values } = useFormState();
  const stepRef = useRef();
  useEffect(() => {
    window.scrollTo(0, stepRef.current.offsetTop);
  }, []);
  return (
    <div className="page-panel-group-container" ref={stepRef}>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title">
          You can give someone else access to your CareHub, and vice versa, so
          that you can have a shared calendar, health tracker, health reports
          and more. Would you like to give {values.caredName}, or someone else,
          access to your CareHub
        </div>
        <div className="page-panel-group-body display-flex">
          <div className="form-group mr-20">
            <Field
              type="radio"
              name="giveAccess"
              value="true"
              component={Radio}
            >
              Yes
            </Field>
          </div>
          <div className="form-group">
            <Field
              type="radio"
              name="giveAccess"
              value="false"
              component={Radio}
            >
              No
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntakeManagerCaregiverFormStep4;
