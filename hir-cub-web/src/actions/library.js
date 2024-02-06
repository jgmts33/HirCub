export const SET_QUESTIONS = '@library/setQuestions';
export const setQuestions = questions => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const SET_PROGRAMS_AND_SERVICES = '@library/setProgramsAndServices';
export const setProgramsAndServices = programsAndServices => ({
  type: SET_PROGRAMS_AND_SERVICES,
  payload: programsAndServices,
});

export const UPDATE_PROGRAM = '@library/updateProgram';
export const updateProgram = (id, status) => ({
  type: UPDATE_PROGRAM,
  payload: { id, status },
});

export const ADD_QUESTION = '@library/addQuestion';
export const addQuestion = question => ({
  type: ADD_QUESTION,
  payload: question,
});

export const SET_USER_SUGGESTIONS = '@library/setUserSuggestions';
export const setUserSuggestions = userSuggestions => ({
  type: SET_USER_SUGGESTIONS,
  payload: userSuggestions,
});

export const ADD_SUGGESTION = '@library/addSuggestion';
export const addSuggestion = userSuggestion => ({
  type: ADD_SUGGESTION,
  payload: userSuggestion,
});

export const UPDATE_SUGGESTION = '@library/updateSuggestion';
export const updateSuggestion = (id, status) => ({
  type: UPDATE_SUGGESTION,
  payload: { id, status },
});
