import CONFIG from '~/utils/config';

const baseUrl = CONFIG.apiBaseUrl;
const cvhUrl = `https://cvh.venuiti.com/umbraco/api/ContentApi`;

export const REGISTER_URL = `${baseUrl}/Account/Register`;
export const LOGIN_URL = `${baseUrl}/Account/Login`;
export const INTAKE_MANAGER_URL = `${baseUrl}/IntakeManager`;
export const WELCOME_QUESTION_SAVE_URL = `${baseUrl}/question/welcome`;
export const HEALTH_TRACKER_URL = `${baseUrl}/HealthTracker`;
export const HEALTH_CONCERNS_URL = `${HEALTH_TRACKER_URL}/concerns`;
export const HEALTH_QUESTIONS_URL = `${HEALTH_TRACKER_URL}/questions`;
export const HEALTH_HEALTH_URL = `${HEALTH_TRACKER_URL}/health`;
export const SCHEDULE_NOTIFICATIONS_URL = `${HEALTH_TRACKER_URL}/ScheduleNotifications`;
export const QUESTIONS_URL = `${baseUrl}/Question`;
export const SUGGESTIONS_URL = `${baseUrl}/Suggestion`;
export const PROGRAM_AND_SERVICE_CATEGORIES_URL = `${cvhUrl}/GetProgramAndServiceCategories`;
export const PROGRAM_AND_SERVICE_URL = `${cvhUrl}/GetProgramAndServiceByDistanceInKm`;
export const ADD_SUGGESTION_URL = `${SUGGESTIONS_URL}/Add`;
export const GET_SUGGESTIONS_URL = `${SUGGESTIONS_URL}/All`;
export const REPORT_URL = `${baseUrl}/Reports/GetReport`;
export const GRAPH_URL = `${baseUrl}/Reports/GetGraph`;
export const EVENTS_URL = `${baseUrl}/Calendar/Events`;
export const ALL_EVENTS_URL = `${baseUrl}/Calendar/AllEvents`;
export const PROFILE_URL = `${baseUrl}/Account/Profile`;
export const PROFILE_IMAGE_URL = `${baseUrl}/account/image`;
export const BASIC_INFO_URL = `${baseUrl}/Account/BasicInfo`;
export const MEDICATION_URL = `${baseUrl}/medication`;
export const JOURNAL_ENTRY = `${baseUrl}/journalEntry`;
export const FINANCE_RECORD_URL = `${baseUrl}/financeRecord`;
export const FINANCE_TABS_URL = `${baseUrl}/financeTabs`
export const REMINDERS_URL = `${baseUrl}/Reminders`;

export const IMPERSONATE_URL = `${baseUrl}/account/impersonate`;
export const IMPERSONATE_NAME_URL = `${baseUrl}/account/impersonation-name`;
export const DEIMPERSONATE_URL = `${baseUrl}/account/deimpersonate`;
export const WELCOME_URL = `${baseUrl}/account/welcome`;
export const INVITE_URL = `${baseUrl}/account/invite`;
export const CREATE_PATIENT_URL = `${baseUrl}/account/createPatient`;

export const SUBSCRIBE_URL = '#';
export const FACEBOOK_URL = '#';
export const TWITTER_URL = '#';
export const INSTAGRAM_URL = '#';
export const YOUTUBE_URL = '#';
export const LINKEDIN_URL = 'https://linkedin.com/...';

export const DONATE_URL = '#';
