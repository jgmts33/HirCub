import fetch from '~/utils/fetch';
import { INTAKE_MANAGER_URL, PROFILE_URL, BASIC_INFO_URL } from '~/consts/urls';

export const submitIntakeManagerInfoRequest = data =>
  fetch(INTAKE_MANAGER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getProfileDataRequest = () =>
  fetch(PROFILE_URL, {
    method: 'GET',
  });

export const postProfileDataRequest = (data) =>
  fetch(PROFILE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getBasicInfoRequest = () =>
  fetch(BASIC_INFO_URL, {
    method: 'GET',
  });
