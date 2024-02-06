import {
  SET_EVENTS,
  ADD_EVENT,
  SET_CURRENT_EVENTS_IDS,
} from '~/actions/calendar';

const initialState = {
  events: [],
  currentEventsIds: [],
};

function calendar(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case SET_CURRENT_EVENTS_IDS:
      return {
        ...state,
        currentEventsIds: action.payload,
      };
    default:
      return state;
  }
}

export default calendar;
