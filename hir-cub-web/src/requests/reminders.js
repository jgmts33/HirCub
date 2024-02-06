import fetch from '~/utils/fetch';
import { REMINDERS_URL } from '~/consts/urls';

export const postRemindersRequest = data =>
  fetch(REMINDERS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getRemindersRequest = () =>
  fetch(REMINDERS_URL, {
    method: 'GET',
  });
