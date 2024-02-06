export const SET_AUTHENTICATED = '@account/setAuthenticated';
export const setAuthenticated = (authToken, isLogin = false) => ({
  type: SET_AUTHENTICATED,
  payload: { authToken, isLogin },
});

export const LOGIN = '@account/login';
export const login = (loginResult, isLogin = false) => ({
  type: LOGIN,
  payload: { loginResult, isLogin },
});

export const LOGOUT = '@account/logout';
export const logout = () => ({
  type: LOGOUT,
});
