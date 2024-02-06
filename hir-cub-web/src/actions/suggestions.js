export const SET_SUGGESTIONS = '@suggestions/setSuggestions';

export const setSuggestions = suggestions => ({
  type: SET_SUGGESTIONS,
  payload: suggestions,
});

export const HIDE_SUGGESTIONS = '@suggestions/hideSuggestions';

export const hideSuggestions = suggestionsIds => ({
  type: HIDE_SUGGESTIONS,
  payload: suggestionsIds,
});

export const SHOW_SUGGESTIONS = '@suggestions/showSuggestions';

export const showSuggestions = suggestionsIds => ({
  type: SHOW_SUGGESTIONS,
  payload: suggestionsIds,
});
