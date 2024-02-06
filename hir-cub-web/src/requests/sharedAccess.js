import fetch from '~/utils/fetch';
import {
  IMPERSONATE_URL,
  IMPERSONATE_NAME_URL,
  DEIMPERSONATE_URL,
  WELCOME_URL,
  INVITE_URL,
  CREATE_PATIENT_URL,
} from '~/consts/urls';

export const getImpersonateRequest = () =>
  fetch(IMPERSONATE_URL, {
    method: 'GET',
  });

export const postImpersonateNameRequest = (data) =>
  fetch(IMPERSONATE_NAME_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const postImpersonateEmailRequest = (email) =>
  fetch(`${IMPERSONATE_URL}/${email}`, {
    method: 'POST',
  });

export const postDeimpersonateRequest = () =>
  fetch(DEIMPERSONATE_URL, {
    method: 'POST',
  });

export const getWelcomeLinkRequest = (truster, guest) =>
  fetch(`${WELCOME_URL}/truster=${truster}&guest=${guest}`, {
    method: 'GET',
  });

export const postInviteRequest = (data) =>
  fetch(INVITE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const postCreatePatientRequest = (data) =>
  fetch(CREATE_PATIENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
