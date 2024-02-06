import {
  SET_SUGGESTIONS,
  HIDE_SUGGESTIONS,
  SHOW_SUGGESTIONS,
} from '~/actions/suggestions';

const initialState = {
  suggestions: [],
  hiddenSuggestionIds: [],
  displayedSuggestionIds: [],
};

function global(state = initialState, action) {
  switch (action.type) {
    case SET_SUGGESTIONS:
      let suggestions = {};
      for (let i = 0; i < action.payload.length; i++) {
        const suggestion = action.payload[i];
        suggestions[suggestion.id] = suggestion;
      }
      return {
        ...state,
        suggestions,
      };
    case HIDE_SUGGESTIONS:
      return {
        ...state,
        hiddenSuggestionIds: [...state.displayedSuggestionIds],
      };
    case SHOW_SUGGESTIONS:
      const newDisplayedSuggestionIds = action.payload.filter(
        s => !state.displayedSuggestionIds.includes(s)
      );
      return {
        ...state,
        displayedSuggestionIds: [
          ...state.displayedSuggestionIds,
          ...newDisplayedSuggestionIds,
        ],
      };
    default:
      return state;
  }
}

export default global;
