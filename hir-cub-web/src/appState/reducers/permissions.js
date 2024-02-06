import { SET_IMPERSONATION_MODE, SET_ABLE_IMPERSONATE } from '~/actions/permissions';
import { PermissionAllow, PermissionType } from '~/consts';

const initialState = {
  isAbleToImpersonate: false,
  isImpersonationMode: false,
  allowedUrls: [],
  roles: [
    {
      tabKey: PermissionType.Welcome,
      allowed: PermissionAllow.Read,
    },
  ],
};

const tabKeys = [
  PermissionType.Library,
  PermissionType.JournalEntry,
  PermissionType.Expenses,
  PermissionType.HealthTracker,
  PermissionType.MedicationTracker,
  PermissionType.MobilityTracker,
  PermissionType.HealthReports,
  PermissionType.Profile,
  PermissionType.Calendar,
];

const getAllowedUrls = (roles) => {
  let allowedUrls = ['', 'welcome'];

  const allowedFeatures = roles
    .map(role => role
      .replace(PermissionAllow.Write, '')
      .replace(PermissionAllow.Read, '')
    );

  if (allowedFeatures.includes(PermissionType.Library)) {
    allowedUrls.push('library');
  }
  if (allowedFeatures.includes(PermissionType.JournalEntry)) {
    allowedUrls.push('notes', 'add-note');
  }
  if (allowedFeatures.includes(PermissionType.Expenses)) {
    allowedUrls.push('expenses');
  }
  if (allowedFeatures.includes(PermissionType.HealthTracker)) {
    allowedUrls.push('health-tracker');
  }
  if (allowedFeatures.includes(PermissionType.MedicationTracker)) {
    allowedUrls.push('medication-tracker');
  }
  if (allowedFeatures.includes(PermissionType.MobilityTracker)) {
    allowedUrls.push('care-needs-tool');
  }
  if (allowedFeatures.includes(PermissionType.HealthReports)) {
    allowedUrls.push('reports');
  }
  if (allowedFeatures.includes(PermissionType.Profile)) {
    allowedUrls.push('profile');
  }

  return allowedUrls;
};

const getHighestPermission = (roles, key) => {
  const allowedRoles = roles.filter(role => role.includes(key)).map(role => role.replace(key, ''));
  return allowedRoles.length > 0
    ? allowedRoles.includes(PermissionAllow.Write)
      ? PermissionAllow.Write
      : PermissionAllow.Read
    : PermissionAllow.None;
};

const mapRoles = (roles) => {
  return tabKeys.map((tab, index) => {
    return {
      tabKey: tab,
      allowed: getHighestPermission(roles, tab),
    };
  });
};

const permissions = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMPERSONATION_MODE:
      if (action.payload.impersonateDetail != null) {
        const { roles } = action.payload.impersonateDetail;
        return {
          ...state,
          ...action.payload,
          roles: [...initialState.roles, ...mapRoles(roles || [])],
          allowedUrls: getAllowedUrls(roles || []),
        };
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    case SET_ABLE_IMPERSONATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default permissions;
