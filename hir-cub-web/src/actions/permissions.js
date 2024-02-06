export const SET_IMPERSONATION_MODE = '@permissions/setImpersonateMode';
export const SET_ABLE_IMPERSONATE = '@permissions/setAbleImpersonate';

export const setImpersonationMode = (isImpersonationMode, impersonateDetail) => ({
  type: SET_IMPERSONATION_MODE,
  payload: { isImpersonationMode, impersonateDetail },
});

export const setAbleToImpersonate = (isAbleToImpersonate) => ({
  type: SET_ABLE_IMPERSONATE,
  payload: { isAbleToImpersonate },
});
