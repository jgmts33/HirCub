import React, { useState, useCallback } from 'react';
import { useTimeout, useSuggestions } from '~/hooks';
import useFormState from '~/utils/formState';
import './styles.scss';

function getIntensityLevel(intensity) {
  if (intensity <= 30) {
    return 'mild';
  } else if (intensity <= 60) {
    return 'moderate';
  } else {
    return 'severe';
  }
}

function IntensitySuggestion(props) {
  const { title, rootName, suggestionConditions, shouldShow, typeId } = props;
  const [isSuggestionShown, setIsSuggestionShown] = useState(false);
  const [alreadyShown, setAlreadyShown] = useState(false);
  const {
    suggestions,
    addedSuggestions,
    handleAddSuggestions,
  } = useSuggestions();
  const { values } = useFormState();
  const intensity =
    values && values[rootName] ? values[rootName]['intensity'] : null;
  const showSuggestion = useCallback(() => {
    if (!suggestionConditions || !shouldShow[typeId] || alreadyShown) {
      return;
    }
    setAlreadyShown(true);
    let suggestionIds = null;
    const intensityIntValue = parseInt(intensity, 10);
    for (let i = 0; i < Object.keys(suggestionConditions.options).length; i++) {
      const key = Object.keys(suggestionConditions.options)[i];
      const param = parseInt(key, 10);
      if (intensityIntValue <= param) {
        suggestionIds = suggestionConditions.options[key];
        break;
      }
    }
    const suggestionsToAdd = suggestionIds
      ? suggestionIds
          .filter(sId => !addedSuggestions[sId])
          .map(sId => suggestions[sId])
      : null;
    if (suggestionsToAdd.length > 0) {
      setIsSuggestionShown(true);

      let ids = [];
      for (let i = 0; i < suggestionsToAdd.length; i++) {
        if (suggestionsToAdd[i]) {
          ids.push(suggestionsToAdd[i].id);
        }
      }

      if (ids.length > 0) {
        handleAddSuggestions(ids);
      }
    }
    // eslint-disable-next-line
  }, [intensity, shouldShow, alreadyShown]);
  useTimeout(showSuggestion, intensity ? 1 : null);
  if (!isSuggestionShown) {
    return null;
  }
  const loweredProblemName = title.toLowerCase();
  const suggestionTitle = `We noticed that you rated your ${loweredProblemName} as ${getIntensityLevel(
    parseInt(intensity, 10)
  )}. We have added resources to your library about ${loweredProblemName} management.`;
  return <div className="health-tracker-suggestion">{suggestionTitle}</div>;
}

export default IntensitySuggestion;
