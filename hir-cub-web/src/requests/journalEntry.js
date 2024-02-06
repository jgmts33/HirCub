import fetch from '~/utils/fetch';
import { JOURNAL_ENTRY } from '~/consts/urls';

export const getJournalEntries = () =>
  fetch(JOURNAL_ENTRY, {
    method: 'GET',
  });

export const createJournalEntry = data =>
  fetch(JOURNAL_ENTRY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const updateJournalEntry = (data, id) =>
  fetch(`${JOURNAL_ENTRY}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getJournalEntry = (id) =>
  fetch(`${JOURNAL_ENTRY}/${id}`, {
    method: 'GET',
  });

export const getJournalEvents = () =>
  fetch(`${JOURNAL_ENTRY}/events`, {
    method: 'GET',
  });

export const getJournalTags = () =>
  fetch(`${JOURNAL_ENTRY}/tags`, {
    method: 'GET',
  });

export const searchJournalEntries = (searchText) =>
  fetch(`${JOURNAL_ENTRY}/search?searchQuery=${searchText}`, {
    method: 'GET',
  });  

export const removeJournalEntry = (id) =>
  fetch(`${JOURNAL_ENTRY}/${id}`, {
    method: 'DELETE',
  });
