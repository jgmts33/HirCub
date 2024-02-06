import React, { useMemo, useState } from 'react';
import { Field } from 'react-final-form';
import { Radio } from '~/components/ui/formControls';
import Concern from '../concerns/concern';
import { GetName } from '~/consts/global';
import './styles.scss';

function getQuestions(caredName) {
  return {
    happiness: {
      title: `How would you rate ${caredName}’s overall happiness right now?`,
      options: ['Very Poor', 'Poor', 'Average', 'Good', 'Great'],
    },
    content: {
      title: `How content do you think ${caredName} is with their life right now?`,
      options: [
        'Not at all content',
        'A little content',
        'Average',
        'Moderately content',
        'Very content',
      ],
    },
  };
}

function Questions() {
  const myName = GetName();

  const [isOpenQuestion, setOpenQuestion] = useState(false);

  const questions = useMemo(() => getQuestions(myName), [myName]);

  return (
    <React.Fragment>
      <hr className="health-tracker_separator" />
      <div className="text-lg font-semibold px-15 mt-40 mb-30">
        Please check any areas that have been a concern. Consider tracking this
        on a weekly or monthly basis.
      </div>
      <div className="w-full question-group">
        {Object.keys(questions).map((name, i) => {
          const { title, options } = questions[name];
          return (
            <div key={name} className="md-form-group">
              <Concern
                title={title}
                noBorder={i === Object.keys(questions).length - 1}
                isOpen={isOpenQuestion}
                setOpen={(flag) => setOpenQuestion(flag)}
              >
                {options.map((e, idx) => (
                  <div key={e} className="form-group">
                    <Field
                      type="radio"
                      name={`${name}`}
                      value={(idx + 1).toString()}
                      component={Radio}
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

export default Questions;
