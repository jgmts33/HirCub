import React, { useRef } from 'react';
import { RadioTemplate } from '~/components/shared/formTemplates';
import { useAddSuggestion } from '~/hooks';
import useFormState from '~/utils/formState';

const suggestionsForStep = {
  sleptDisturbed: {
    title: 'Would you like something to be added to your library about this?',
    options: { 1: [43, 44] },
  },
};

const HowDoingFormStep = (props) => {
  const {
    suggestions,
    addSuggestion,
    addedSuggestions,
    questions,
  } = props;
  const { values } = useFormState();
  const stepRef = useRef();
  useAddSuggestion(suggestionsForStep, values);

  const radioAnswer = (question) => {
    const result = question.options
      .filter((opt) => opt.value === values[question.name])
      .map((opt) => opt.label);
    return result[0] || '';
  };

  return (
    <div className="form-how-doing">
      <div className="page-panel-group-container" ref={stepRef}>
        {questions.map((question, i) => {
          return (
            <RadioTemplate
              key={i}
              question={question}
              value={values[question.name]}
              suggestions={suggestions}
              addedSuggestions={addedSuggestions}
              addSuggestion={addSuggestion}
              answer={radioAnswer(question)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HowDoingFormStep;
