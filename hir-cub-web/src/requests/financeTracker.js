import fetch from '~/utils/fetch';
import { FINANCE_TABS_URL } from '~/consts/urls';

export const trackFinanceRequest = data =>
  fetch(FINANCE_TABS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });