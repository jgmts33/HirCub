import React from 'react';
import useAppState from '~/appState';
import { Field } from 'react-final-form';
import { Tooltip } from '~/components/ui';
import { Radio, Textarea } from '~/components/ui/formControls';

function Concern(props) {
  const { rootName } = props;
  const {
    global: { caredName },
  } = useAppState();

  const renderInfo = () => {
    return (
      <Tooltip position="right">
        You may want to track what was happening when the symptom began, what
        makes it worse (like movement, breathing or laying down), and if
        anything made it feel better (like rest or taking a dose of prescribed
        medication).
      </Tooltip>
    );
  };

  return (
    <div>
      <div className="bg-white py-10 px-20 rounded-4 mb-20">
        <div className="text-center font-semibold mb-10">
          How concerning is this symptom to {caredName ? caredName : 'you'}?
        </div>
        <div className="mb-10">
          <Field
            type="radio"
            name={`${rootName}.concern`}
            value="1"
            component={Radio}
          >
            Not
          </Field>
        </div>
        <div className="mb-10">
          <Field
            type="radio"
            name={`${rootName}.concern`}
            value="2"
            component={Radio}
          >
            Somewhat
          </Field>
        </div>
        <div className="mb-10">
          <Field
            type="radio"
            name={`${rootName}.concern`}
            value="3"
            component={Radio}
          >
            Very Important
          </Field>
        </div>
      </div>

      <div className="bg-white py-10 px-20 rounded-4 mb-20">
        <div className="text-center font-semibold mb-10 track-other">
          Would you like to share any details?{renderInfo()}
        </div>
        <div className="mb-10">
          <Field name={`${rootName}.textarea`} component={Textarea} rows="5"></Field>
        </div>
      </div>
    </div>
  );
}

export default Concern;
