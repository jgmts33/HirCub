import React, { useRef, useEffect } from 'react';
import useFormState from '~/utils/formState';
import { Field } from 'react-final-form';
import { Textarea } from '~/components/ui/formControls';

const title = `This might include key roles or qualities you feel define you as a person, people and things that are important to you, core values, things you are afraid of, care preferences / personal care needs, etc..`;

function IntakeManagerCaregiverFormStep3() {
  const { values } = useFormState();
  const stepRef = useRef();
  useEffect(() => {
    window.scrollTo(0, stepRef.current.offsetTop);
  }, []);
  return (
    <div className="page-panel-group-container" ref={stepRef}>
      <div className="page-panel-group panel-group">
        <div className="page-panel-group-title" title={title}>
          Patient Dignity Question: What does your health care team need to know
          about you and/or {values.caredName} as a person to give you the best
          care possible?
        </div>
        <div className="page-panel-group-body">
          <div className="form-group">
            <Field name="additionalInfo" component={Textarea} rows="5">
              Yes
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntakeManagerCaregiverFormStep3;
