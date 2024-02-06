import { useLayoutEffect } from 'react';
import { useAppDispatch } from '~/appState';
import { showSuggestions } from '~/actions/suggestions';

function useAddSuggestion(formSuggestions, values) {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    let suggestionIds = [];
    for (var key in formSuggestions) {
      if (
        (values[key] || values[key] === 0 || values[key] === false) &&
        formSuggestions[key]
      ) {
        const { condition, options } = formSuggestions[key];
        const optionsKey = condition ? condition(values[key]) : values[key];
        const newSuggestionIds = options[optionsKey];
        if (newSuggestionIds) {
          suggestionIds = [...suggestionIds, ...newSuggestionIds];
        }
      }
    }
    if (suggestionIds.length > 0) {
      dispatch(showSuggestions(suggestionIds));
    }
  }, [values, dispatch, formSuggestions]);
}

export default useAddSuggestion;
