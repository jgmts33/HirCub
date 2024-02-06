import fetch from '~/utils/fetch';
import { MEDICATION_URL } from '~/consts/urls';

export const createMedicationRequest = (data) =>
  fetch(MEDICATION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getMedicationRequest = () =>
  fetch(`${MEDICATION_URL}/GetAll`, {
    method: 'GET',
  });

export const updateMedicationRequest = (data, id) =>
  fetch(`${MEDICATION_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const removeMedicationRequest = (id) =>
  fetch(`${MEDICATION_URL}/${id}`, {
    method: 'DELETE',
  });
