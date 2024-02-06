export const SET_EVENTS = '@calendar/setEvents';
export const setEvents = events => ({
  type: SET_EVENTS,
  payload: events,
});

export const ADD_EVENT = '@calendar/addEvent';
export const addEvent = event => ({
  type: ADD_EVENT,
  payload: event,
});

export const SET_CURRENT_EVENTS_IDS = '@calendar/setCurrentEventsIds';
export const setCurrentEventsIds = date => ({
  type: SET_CURRENT_EVENTS_IDS,
  payload: date,
});
