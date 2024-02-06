import fetch from '~/utils/fetch';
import { SCHEDULE_NOTIFICATIONS_URL, HEALTH_TRACKER_URL, HEALTH_CONCERNS_URL, HEALTH_QUESTIONS_URL, HEALTH_HEALTH_URL } from '~/consts/urls';

export const scheduleNotificationRequest = data =>
  fetch(SCHEDULE_NOTIFICATIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const trackHealthStateRequest = data =>
  fetch(HEALTH_TRACKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const trackConcernsRequest = data =>
  fetch(HEALTH_CONCERNS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const trackQuestionsRequest = data =>
  fetch(HEALTH_QUESTIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const trackProblemsRequest = data =>
  fetch(HEALTH_HEALTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
