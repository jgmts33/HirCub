import React from 'react';

function Suggestion(props) {
  const { title, suggestions, addSuggestion } = props;
  return (
    <div className="mb-10">
      {title}
      {suggestions.map(suggestion => (
        <React.Fragment key={suggestion.id}>
          <div className="flex items-center row-mx-15 mt-10">
            <div className="px-15">{suggestion.title}</div>
            <div className="px-15">
              <button type="button" className="btn btn-blue" onClick={() => addSuggestion(suggestion.id)}>
                Add
              </button>
          </div>
        </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Suggestion;
