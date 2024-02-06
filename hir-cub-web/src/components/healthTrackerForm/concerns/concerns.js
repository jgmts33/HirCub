import React, { useMemo, useState } from 'react';
import useAppState from '~/appState';
import { Field } from 'react-final-form';
import { Checkbox } from '~/components/ui/formControls';
import Concern from './concern';
import './styles.scss';

function getConcerns(caredName) {
  return {
    emotional: {
      title: 'Emotional',
      options: [
        'Fears/worries',
        'Sadness',
        'Frustration/anger',
        'Changes in appearance',
        'Intimacy/sexuality',
      ],
    },
    practical: {
      title: 'Practical',
      options: [
        'Work/school',
        'Finances',
        'Getting to and from appointments',
        'Accommodation',
      ],
    },
    information: {
      title: 'Information',
      options: [
        `Understanding ${caredName} illness and/or treatment`,
        'Talking with the health care team',
        'Making treatment decisions',
        'Knowing about available resources',
      ],
    },
    spiritual: {
      title: 'Spiritual',
      options: ['Meaning/purpose of life', 'Faith'],
    },
    socialFamily: {
      title: 'Social/Family',
      options: [
        'Feeling a burden to others',
        'Worry about family/friends',
        'Feeling alone',
      ],
    },
    physical: {
      title: 'Physical',
      options: ['Sleep', 'Weight', 'Concentration/memory'],
    },
  };
}

function Concerns() {
  const {
    global: { caredName },
  } = useAppState();
  const concerns = useMemo(() => getConcerns(caredName), [caredName]);

  const [isOpenConcern, setOpenConcern] = useState(false);

  return (
    <React.Fragment>
      <hr className="health-tracker_separator" />
      <div className="text-lg font-semibold px-15 mt-40 mb-30">
        Please check any areas that have been a concern for you or for{' '}
        {caredName} over the past week.
      </div>
      <div className="w-full concern-group">
        {Object.keys(concerns).map((name) => {
          const { title, options } = concerns[name];
          return (
            <div key={name} className="md-form-group concern">
              <Concern
                title={title}
                isOpen={isOpenConcern}
                setOpen={(flag) => setOpenConcern(flag)}
              >
                {options.map((e, idx) => (
                  <div key={e} className="form-group">
                    <Field
                      type="checkbox"
                      name={`concerns.${name}`}
                      value={(idx + 1).toString()}
                      component={Checkbox}
                    >
                      {e}
                    </Field>
                  </div>
                ))}
              </Concern>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Concerns;
