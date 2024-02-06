import useAppState from '~/appState';
import { PermissionAllow } from '~/consts';

const usePermission = (tabKey) => {
  const {
    permissions: {
      isImpersonationMode,
      roles,
      isAbleToImpersonate,
      allowedUrls,
    },
  } = useAppState();

  const tabPermission = tabKey
    ? roles.find((item) => item.tabKey == tabKey)
    : '';
  const isAccessAllowed =
    (tabPermission && tabPermission.allowed !== PermissionAllow.None) || false;
  const isWriteAllowed =
    (tabPermission && tabPermission.allowed == PermissionAllow.Write) || false;

  return {
    isImpersonationMode,
    tabPermission,
    isAbleToImpersonate,
    isAccessAllowed,
    allowedUrls,
    isWriteAllowed,
    roles,
  };
};

export default usePermission;
