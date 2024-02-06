import jwtDecode from 'jwt-decode';

const ImpersonateRole =
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export const IsImpersonated = () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return false;
  }
  const decoded = jwtDecode(authToken);
  const roles = decoded[ImpersonateRole];
  if (roles instanceof Array && roles.includes('CanDeimpersonate')) {
    return true;
  }
  return false;
};

export const GetImpersonatedUser = () => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    const accountType = null;
    const roles = [];
    const isImpersonated = false;
    return { accountType, roles, isImpersonated };  
  }
  const decoded = jwtDecode(authToken);

  const accountType = decoded['account_type'];
  const roles = decoded[ImpersonateRole];
  const isImpersonated =
    (roles instanceof Array && roles.includes('CanDeimpersonate')) || false;

  return { accountType, roles, isImpersonated };
};
