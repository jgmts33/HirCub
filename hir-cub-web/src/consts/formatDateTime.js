import moment from 'moment';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

export const formatDateString = 'MM/DD/YYYY';

// limit date of the report by 3 months
export const limitValue = 3;
export const limitType = 'M';

export const formatDateTime = (date, format) => {
  if (date) {
    return moment(date).format(format);
  }
  return moment().format(format);
};

export const formatDateMMMDD = (date) => {
  return formatDateTime(date, 'MMM DD');
};

export const formatDateMMMM = (date) => {
  return formatDateTime(date, 'MMMM');
};

export const formatDateNormal = (date) => {
  return formatDateTime(date, formatDateString);
};

export const formatDateStandard = (date) => {
  if (date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  }
  return moment().format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDateYMD = (date) => {
  return formatDateTime(date, 'YYYY-MM-DD');
};

export const convertDate = (date) => {
  if (date) {
    return moment(date).toDate();
  }
  return moment().toDate();
};

export function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

export function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

export function formatDateDefault(date) {
  return formatDate(date, formatDateString, 'en-ca');
}
