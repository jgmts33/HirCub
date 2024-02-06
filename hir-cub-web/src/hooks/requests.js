import useRequest from './useRequest';
import useFetchOnce from './useFetchOnce';
import {
  submitIntakeManagerInfoRequest,
  getProfileDataRequest,
  getBasicInfoRequest,
  postProfileDataRequest,
} from '~/requests/profile';
import { signUpRequest, loginRequest } from '~/requests/account';
import {
  scheduleNotificationRequest,
  trackConcernsRequest,
  trackProblemsRequest,
  trackHealthStateRequest,
  trackQuestionsRequest,
} from '~/requests/healthTracker';
import {
  getQuestionsRequest,
  askQuestionRequest,
  getUserSuggestionsRequest,
  setSuggestionStatusRequest,
  addSuggestionRequest,
  addSuggestionsRequest,
  getSuggestionsRequest,
} from '~/requests/library';
import {
  getEventsRequest,
  createEventRequest,
  getAllEventsRequest,
} from '~/requests/calendar';
import {
  postInviteRequest,
  getImpersonateRequest,
  postImpersonateEmailRequest,
  postDeimpersonateRequest,
  postImpersonateNameRequest,
  postCreatePatientRequest,
} from '~/requests/sharedAccess';
import { postWelcomeQuestionRequest } from '~/requests/welcome';
import {
  trackFinanceRequest,
} from '~/requests/financeTracker';
import { LOG } from '~/consts/global';
import { getRemindersRequest, postRemindersRequest } from '~/requests/reminders';

export function useSubmitIntakeManagerInfoRequest(callback) {
  return useRequest(submitIntakeManagerInfoRequest, callback);
}

export function useSignUpRequest(callback) {
  LOG('>>> signUpRequest');
  return useRequest(signUpRequest, callback);
}

export function useLoginRequest(callback) {
  LOG('>>> loginRequest');
  return useRequest(loginRequest, callback);
}

export function useScheduleNotificationRequest(callback) {
  LOG('>>> scheduleNotificationRequest');
  return useRequest(scheduleNotificationRequest, callback);
}

export function useAskQuestionRequest(callback) {
  LOG('>>> askQuestionRequest');
  return useRequest(askQuestionRequest, callback);
}

export function useGetQuestionsFetchOnce(callback) {
  LOG('>>> getQuestionsRequest');
  return useFetchOnce(getQuestionsRequest, callback);
}

export function useGetUserSuggestionsFetchOnce(isAuthenticated, callback) {
  // LOG('>>> getUserSuggestionsRequest');
  return useFetchOnce(
    isAuthenticated ? getUserSuggestionsRequest : null,
    callback
  );
}

export function useSetSuggestionStatusRequest(callback) {
  // LOG('>>> setSuggestionStatusRequest');
  return useRequest(setSuggestionStatusRequest, callback);
}

export function useTrackHealthStateRequest(callback) {
  LOG('>>> trackHealthStateRequest');
  return useRequest(trackHealthStateRequest, callback);
}

export function useTrackConcernsRequest(callback) {
  LOG('>>> trackConcernsRequest');
  return useRequest(trackConcernsRequest, callback);
}

export function useTrackQuestionsRequest(callback) {
  LOG('>>> trackQuestionsRequest');
  return useRequest(trackQuestionsRequest, callback);
}

export function useTrackProblemsRequest(callback) {
  LOG('>>> trackProblemsRequest');
  return useRequest(trackProblemsRequest, callback);
}

export function useCreateEventRequest(callback) {
  LOG('>>> createEventRequest');
  return useRequest(createEventRequest, callback);
}

export function useGetEventsFetchOnce(callback) {
  LOG('>>> getEventsRequest');
  return useFetchOnce(getEventsRequest, callback);
}

export function useGetAllEventsRequest(callback) {
  LOG('>>> getAllEventsRequest');
  return useRequest(getAllEventsRequest, callback);
}

export function useAddSuggestionRequest(callback) {
  // LOG('>>> addSuggestionRequest');
  return useRequest(addSuggestionRequest, callback);
}

export function useAddSuggestionsRequest(callback) {
  // LOG('>>> addSuggestionsRequest');
  return useRequest(addSuggestionsRequest, callback);
}

export function useGetSuggestionsFetchOnce(isAuthenticated, callback) {
  // LOG('>>> getSuggestionsRequest');
  return useFetchOnce(isAuthenticated ? getSuggestionsRequest : null, callback);
}

export function useGetProfileDataFetchOnce(callback) {
  LOG('>>> getProfileDataRequest');
  return useFetchOnce(getProfileDataRequest, callback);
}

export function usePostProfileDataRequest(callback) {
  LOG('>>> usePostProfileDataRequest');
  return useRequest(postProfileDataRequest, callback);
}

export function useGetBasicInfoFetchOnce(isAuthenticated, callback) {
  LOG('>>> getBasicInfoRequest');
  return useFetchOnce(isAuthenticated ? getBasicInfoRequest : null, callback);
}

export function useGetRemindersFetchOnce(callback) {
  LOG('>>> getRemindersRequest');
  return useFetchOnce(getRemindersRequest, callback);
}

export function usePostRemindersRequest(callback) {
  LOG('>>> usePostRemindersRequest');
  return useRequest(postRemindersRequest, callback);
}

export function usePostInviteRequest(callback) {
  LOG('>>> postInviteRequest');
  return useRequest(postInviteRequest, callback);
}

export function useGetImpersonate(callback) {
  return useRequest(getImpersonateRequest, callback);
}

export function useActiveImpersonate(callback) {
  return useRequest(postImpersonateEmailRequest, callback);
}

export function useDeActiveImpersonate(callback) {
  return useRequest(postDeimpersonateRequest, callback);
}

export function useSetNameImpersonate(callback) {
  return useRequest(postImpersonateNameRequest, callback);
}

export function useTrackFinanceRequest(callback) {
  LOG('>>> trackFinanceRequest');
  return useRequest(trackFinanceRequest, callback);
}
export function usePostCreatePatientRequest(callback) {
  return useRequest(postCreatePatientRequest, callback);
}

export function usePostWelcomeQuestionRequest(callback) {
  return useRequest(postWelcomeQuestionRequest, callback);
}