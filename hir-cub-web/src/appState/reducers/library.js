import {
  SET_QUESTIONS,
  SET_PROGRAMS_AND_SERVICES,
  UPDATE_PROGRAM,
  ADD_QUESTION,
  SET_USER_SUGGESTIONS,
  ADD_SUGGESTION,
  UPDATE_SUGGESTION,
} from '~/actions/library';

const initialState = {
  questions: [],
  userSuggestions: [],
  programsAndServices: [],
};

function library(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case SET_PROGRAMS_AND_SERVICES:
      return {
        ...state,
        programsAndServices: action.payload,
      };
    case UPDATE_PROGRAM: {
      const { id, status } = action.payload;
      const programsAndServices = state.programsAndServices.map(s => {
        if (s.id !== id) {
          return s;
        }
        return {
          ...s,
          status,
        };
      });
      return {
        ...state,
        programsAndServices,
      };
    }
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    case SET_USER_SUGGESTIONS:
      return {
        ...state,
        userSuggestions: [...action.payload],
      };
    case ADD_SUGGESTION:
      return {
        ...state,
        userSuggestions: [...state.userSuggestions, action.payload],
      };
    case UPDATE_SUGGESTION:
      const { id, status } = action.payload;
      const userSuggestions = state.userSuggestions.map(s => {
        if (s.id !== id) {
          return s;
        }
        return {
          ...s,
          status,
        };
      });
      return {
        ...state,
        userSuggestions,
      };
    default:
      return state;
  }
}

export default library;
