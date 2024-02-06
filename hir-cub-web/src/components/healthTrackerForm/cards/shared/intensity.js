import React from 'react';
import { Field } from 'react-final-form';
import IntensitySuggestion from './intensitySuggestion';
import './styles.scss';

function Intensity(props) {
  const {
    title,
    rootName,
    suggestionConditions,
    shouldShowSuggestions,
    typeId,
    minScale,
    maxScale,
  } = props;
  return (
    <div className="bg-white py-10 px-20 rounded-4 mb-20 rounded-4">
      <div className="input-range-group">
        <IntensitySuggestion
          title={title}
          rootName={rootName}
          suggestionConditions={suggestionConditions}
          shouldShow={shouldShowSuggestions}
          typeId={typeId}
        />

        <div>
          <div className="level-indicator">
            {[...Array(11).keys()].map((item, key) => (
              <div className="level-value" key={key}>
                <span className="level-value-item">{item}</span>
              </div>
            ))}
          </div>
          <Field
            name={`${rootName}.intensity`}
            component="input"
            type="range"
            step={10}
          />
        </div>

        <div className="flex justify-between row-mx-15">
          <div className="w-1-2 font-semibold text-sm-base">{minScale}</div>
          <div className="w-1-2 font-semibold text-right text-sm-base">
            {maxScale}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intensity;
