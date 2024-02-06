import fetch from '~/utils/fetch';
import { WELCOME_QUESTION_URL, WELCOME_QUESTION_SAVE_URL } from '~/consts/urls';

export const postWelcomeQuestionRequest = data =>
  fetch(WELCOME_QUESTION_SAVE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });