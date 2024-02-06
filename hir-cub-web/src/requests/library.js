import fetch, { fetchDataWithoutAuthorization } from '~/utils/fetch';
import {
  QUESTIONS_URL,
  SUGGESTIONS_URL,
  ADD_SUGGESTION_URL,
  GET_SUGGESTIONS_URL,
  PROGRAM_AND_SERVICE_CATEGORIES_URL,
  PROGRAM_AND_SERVICE_URL,
} from '~/consts/urls';
import { buildUrlParamsString } from '~/utils';

export const getQuestionsRequest = () =>
  fetch(QUESTIONS_URL, {
    method: 'GET',
  });

export const askQuestionRequest = data =>
  fetch(QUESTIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getUserSuggestionsRequest = () =>
  fetch(SUGGESTIONS_URL, {
    method: 'GET',
  });

export const setSuggestionStatusRequest = (id, status) =>
  fetch(`${SUGGESTIONS_URL}/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

export const addSuggestionRequest = id =>
  fetch(`${ADD_SUGGESTION_URL}/${id}`, {
    method: 'POST',
  });

export const addSuggestionsRequest = ids =>
  fetch(`${ADD_SUGGESTION_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"ids":${JSON.stringify(ids)}}`,
  });

export const getSuggestionsRequest = id =>
  fetch(GET_SUGGESTIONS_URL, {
    method: 'GET',
  });

export const getProgramAndServiceCategoriesRequest = (data) => {
  const params = data ? `?${buildUrlParamsString(data)}` : '';

  return fetchDataWithoutAuthorization(`${PROGRAM_AND_SERVICE_CATEGORIES_URL}${params}`, {
    method: 'GET',
  }, true);
};

export const getProgramAndServiceRequest = (data) => {
  const params = data ? `?${buildUrlParamsString(data)}` : '';

  return fetchDataWithoutAuthorization(
    `${PROGRAM_AND_SERVICE_URL}${params}`,
    {
      method: 'GET',
    },
    true
  );
};
