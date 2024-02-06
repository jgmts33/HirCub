import fetch from '~/utils/fetch';
import { REGISTER_URL, LOGIN_URL } from '~/consts/urls';

export const signUpRequest = data =>
  fetch(REGISTER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const loginRequest = data =>
  fetch(LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
