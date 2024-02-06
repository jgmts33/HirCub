import fetch from '~/utils/fetch';
import { ALL_EVENTS_URL, EVENTS_URL } from '~/consts/urls';

export const createEventRequest = data =>
  fetch(EVENTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getEventsRequest = () =>
  fetch(EVENTS_URL, {
    method: 'GET',
  });

export const getAllEventsRequest = () =>
  fetch(ALL_EVENTS_URL, {
    method: 'GET',
  });
