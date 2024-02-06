import React from 'react';
import { Field } from 'react-final-form';
import Suggestion from '~/components/shared/suggestion';
import { Radio } from '~/components/ui/formControls';

function RadioTemplate(props) {
  const {
    question,
    value,
    addedSuggestions,
    addSuggestion,
    suggestions,
  } = props;
  const suggestionIds =
    value && question.suggestions ? question.suggestions.options[value] : null;
  const activeSuggestions = suggestionIds
    ? suggestionIds
        .filter((sId) => !addedSuggestions[sId])
        .map((sId) => suggestions[sId])
    : null;
  return (
    <div className="page-panel-group panel-group radio">
      <div className="page-panel-group-title">
        {question.title}
        <span className="page-panel-group-subtitle">
          {question.subTitle && question.subTitle}
        </span>
      </div>
      <div className="page-panel-group-body">
        {false && activeSuggestions && activeSuggestions.length > 0 && (
          <Suggestion
            title={question.suggestions.title}
            suggestions={activeSuggestions}
            addSuggestion={addSuggestion}
          />
        )}
        {question.options.map((option, idx) =>
          option.value !== '-1' ? (
            <div
              key={`${idx}-${option.value}`}
              className={`form-group ${
                value && value.indexOf(option.value) > -1 ? 'checked' : ''
              }`}
            >
              <Field
                type="radio"
                name={question.name}
                value={option.value}
                component={Radio}
              >
                {option.label}
              </Field>
            </div>
          ) : (
            <div key={`${idx}-${option.value}`} className="form-group none" />
          )
        )}
      </div>
      {/* <div className="page-panel-group-body print-item">
        {answer}
      </div> */}
    </div>
  );
}

export default RadioTemplate;
