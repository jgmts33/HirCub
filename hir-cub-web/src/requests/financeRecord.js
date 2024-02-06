import fetch from '~/utils/fetch';
import { FINANCE_RECORD_URL } from '~/consts/urls';


export const getFinanceRecords = () =>
  fetch(`${FINANCE_RECORD_URL}/GetAll`, {
    method: 'GET',
  });

export const createFinanceRecord = data =>
  fetch(FINANCE_RECORD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });


export const updateFinanceRecord = (data, id) =>
  fetch(`${FINANCE_RECORD_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });  

export const getFinanceRecord = (id) =>
  fetch(`${FINANCE_RECORD_URL}/${id}`, {
    method: 'GET',
  });

export const deleteFinanceRecord = (id) =>
  fetch(`${FINANCE_RECORD_URL}/${id}`, {
    method: 'DELETE',
  });

export const getFinanceCategories = () =>
  fetch(`${FINANCE_RECORD_URL}/categories`, {
    method: 'GET',
  });