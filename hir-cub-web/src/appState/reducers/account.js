import { SET_AUTHENTICATED, LOGIN, LOGOUT } from '~/actions/account';

const initialState = { isAuthenticated: false };

function account(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export default account;
