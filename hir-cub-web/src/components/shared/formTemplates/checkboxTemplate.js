import React from 'react';
import { Field } from 'react-final-form';
import Suggestion from '~/components/shared/suggestion';
import { Checkbox } from '~/components/ui/formControls';

function CheckboxTemplate(props) {
  const {
    question,
    value,
    addedSuggestions,
    addSuggestion,
    suggestions,
  } = props;
  const name = question.name; // question.options.length > 1 ? `${question.name}[]` : question.name;
  return (
    <div className="page-panel-group panel-group checkbox">
      <div className="page-panel-group-title">{question.title}</div>
      <div className="page-panel-group-body">
        {question.options.map(option => {
          const isChecked = value && value.indexOf(option.value) > -1;
          const suggestionIds =
            isChecked && question.suggestions
              ? question.suggestions.options[option.value]
              : null;
          const activeSuggestions = suggestionIds
            ? suggestionIds
              .filter(sId => !addedSuggestions[sId])
              .map(sId => suggestions[sId])
            : null;
          return (
            <div
              key={option.value}
              className={`form-group ${isChecked ? 'checked' : ''}`}
            >
              {false && activeSuggestions && activeSuggestions.length > 0 && (
                <Suggestion
                  title={question.suggestions.title}
                  suggestions={activeSuggestions}
                  addSuggestion={addSuggestion}
                />
              )}
              <Field
                type="checkbox"
                name={name}
                value={option.value}
                component={Checkbox}
              >
                {option.label}
              </Field>
            </div>
          );
        })}
      </div>
      {/* <div className="page-panel-group-body print-item">
        {answer}
      </div> */}
    </div>
  );
}

export default CheckboxTemplate;
