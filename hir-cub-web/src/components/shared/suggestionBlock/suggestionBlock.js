import React from 'react';
import Suggestion from '~/components/shared/suggestion';

function SuggestionBlock(props) {
  const {
    name,
    value,
    addedSuggestions,
    addSuggestion,
    suggestions,
    formSuggestions,
  } = props;
  const relatedSuggestions = formSuggestions[name];
  const relatedSuggestionIds =
    value && relatedSuggestions ? relatedSuggestions.options[value] : null;
  const activeSuggestions = relatedSuggestionIds
    ? relatedSuggestionIds
        .filter(sId => !addedSuggestions[sId])
        .map(sId => suggestions[sId])
    : null;
  if (!activeSuggestions || activeSuggestions.length === 0) {
    return null;
  }
  return (
    <Suggestion
      title={relatedSuggestions.title}
      suggestions={activeSuggestions}
      addSuggestion={addSuggestion}
    />
  );
}

export default SuggestionBlock;
