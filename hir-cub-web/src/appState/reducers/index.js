import global from './global';
import account from './account';
import library from './library';
import calendar from './calendar';
import suggestions from './suggestions';
import permissions from './permissions';

function rootReducer(state, action) {
  return {
    global: global(state.global, action),
    account: account(state.account, action),
    library: library(state.library, action),
    calendar: calendar(state.calendar, action),
    suggestions: suggestions(state.suggestions, action),
    permissions: permissions(state.permissions, action),
  };
}

export default rootReducer;
