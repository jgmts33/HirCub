import React, { useEffect, useMemo, useState } from 'react';
import useAppState from '~/appState';
import Loader from '~/components/Loader';
import { useSuggestions } from '~/hooks';


function SuggestionsLoading() {
  const {
    suggestions: { displayedSuggestionIds, hiddenSuggestionIds },
  } = useAppState();
  const {
    suggestions,
    addedSuggestions,
    handleAddSuggestions,
  } = useSuggestions();

  const shownSuggestions = useMemo(() => {
    return displayedSuggestionIds
      .filter(
        sId => !hiddenSuggestionIds.includes(sId) && !addedSuggestions[sId]
      )
      .map(sId => suggestions[sId]);
  }, [
    displayedSuggestionIds,
    hiddenSuggestionIds,
    addedSuggestions,
    suggestions,
  ]);
  
  const isOpen = shownSuggestions && shownSuggestions.length > 0;
  
  const [isLoading, setLoading] = useState(false);

  const handleCompleted = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      let ids = [];
      for (let i = 0; i < shownSuggestions.length; i++) {
        if (shownSuggestions[i]) {
          ids.push(shownSuggestions[i].id);
        }
      }

      if (ids.length > 0) {
        setLoading(true);    
        handleAddSuggestions(ids, handleCompleted);
      }
    }
  }, [isOpen]);
  
  return (
    isOpen && isLoading && <Loader />
  );
}

export default SuggestionsLoading;
