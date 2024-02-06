import { useMemo, useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { addSuggestion } from '~/actions/library';
import { useAddSuggestionsRequest } from '~/hooks/requests';
import { showAddedPrompt } from '~/actions/global';

function useSuggestions() {
  const {
    library: { userSuggestions },
    suggestions: { suggestions },
  } = useAppState();
  const dispatch = useAppDispatch();
  const addedSuggestions = useMemo(() => {
    let addedSuggestions = {};
    for (let i = 0; i < userSuggestions.length; i++) {
      addedSuggestions[userSuggestions[i].suggestionId] = true;
    }
    return addedSuggestions;
  }, [userSuggestions]);

  const { errors: _errors, sendRequest } = useAddSuggestionsRequest(
    handleSuggestionSubmitSuccess
  );
  const [handleCompleted, setHandleCompleted] = useState();

  function handleSuggestionSubmitSuccess(userSuggestion) {
    dispatch(addSuggestion(userSuggestion));

    if (handleCompleted) {
      handleCompleted();
    }

    dispatch(showAddedPrompt(true));
  }
  // function handleAddSuggestion(id) {
  //   sendRequest(id);
  // }
  function handleAddSuggestions(ids, completed) {
    setHandleCompleted(completed);
    sendRequest(ids);
  }
  return {
    suggestions,
    addedSuggestions,
    handleAddSuggestions,
  };
}

export default useSuggestions;
