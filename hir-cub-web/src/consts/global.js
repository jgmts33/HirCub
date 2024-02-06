import moment from 'moment';
import useAppState from '~/appState';

export const checkDateIsBetween = (start, end, current) => {
  const s = moment.parseZone(start);
  const e = moment.parseZone(end);
  const c = moment.parseZone(current);

  if (s.valueOf() <= c.valueOf() && c.valueOf() <= e.valueOf()) {
    return true;
  }

  return false;
};

export const checkDateIsAfter = (date, current) => {
  const d = moment.parseZone(date);
  const c = moment.parseZone(current);

  return d.valueOf() <= c.valueOf();
};

export const checkDateIsBefore = (date, current) => {
  const d = moment.parseZone(date);
  const c = moment.parseZone(current);

  return c.valueOf() <= d.valueOf();
};

export const compareDate = (string1, string2, dir) => {
  const date1 = new Date(string1);
  const date2 = new Date(string2);
  if (dir > 0) {
    return date1.getTime() - date2.getTime();
  }
  return date2.getTime() - date1.getTime();
};

export const compareString = (string1, string2, dir) => {
  let str1 = string1 ? string1.toLowerCase() : '';
  let str2 = string2 ? string2.toLowerCase() : '';
  if (dir > 0) {
    if (str1 < str2) {
      return -1;
    }
    if (str1 > str2) {
      return 1;
    }
  } else {
    if (str2 < str1) {
      return -1;
    }
    if (str2 > str1) {
      return 1;
    }
  }
  return 0;
};

export const GetName = () => {
  const {
    global: { userName, screenName },
  } = useAppState();
  if (screenName) {
    return screenName.trim();
  }
  return userName;
};

export const GetValuesFromLocal = (appState, suffix) => {
  const {
    global: { userId },
  } = appState;

  if (userId) {
    let str = localStorage.getItem(`${userId}-${suffix}`);
    let value = JSON.parse(str);
    return value;
  }
  return null;
};

export const SetValuesToLocal = (appState, suffix, data) => {
  const {
    global: { userId },
  } = appState;

  if (userId) {
    let str = JSON.stringify(data);
    localStorage.setItem(`${userId}-${suffix}`, str);
  }
};

const DEV_MODE = true;
export function LOG(msg, ...optionalParams) {
  if (DEV_MODE) {
    if (optionalParams && optionalParams.length > 0) {
      console.log(msg, optionalParams);
    } else {
      console.log(msg);
    }
  }
}

export const strToInt = (value) => {
  if (value != null && value != undefined) {
    return Number(value);
  }
  return null;
};

export const intToStr = (value) => {
  if (value != null && value != undefined) {
    return `${value}`;
  }
  return null;
};

export const strToBool = (value) => {
  if (value != null && value != undefined) {
    return value == '1';
  }
  return null;
};

export const boolToStr = (value) => {
  if (value != null && value != undefined) {
    return value ? '1' : '2';
  }
  return null;
};
