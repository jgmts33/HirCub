import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import useAppState, { useAppDispatch } from '~/appState';
import { setProfileInfo } from '~/actions/global';
import { setSuggestions } from '~/actions/suggestions';
import { setUserSuggestions } from '~/actions/library';
import {
  useGetSuggestionsFetchOnce,
  useGetUserSuggestionsFetchOnce,
  useGetProfileDataFetchOnce,
} from '~/hooks/requests';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import SuggestionsLoading from '~/components/modals/suggestionsLoading';
import AddResourceConfirmModal from './modals/addResourceConfirmModal';
import ChangeSettingConfirmModal from './modals/changeSettingConfirmModal';
import QuestionSaveConfirmModal from './modals/questionSaveConfirmModal';
import { GetImpersonatedUser } from '~/consts';
import { setImpersonationMode } from '~/actions/permissions';

function App() {
  const {
    account: { isAuthenticated },
  } = useAppState();

  const dispatch = useAppDispatch();

  const [_fetchSuggestionsErrors] = useGetSuggestionsFetchOnce(
    isAuthenticated,
    (suggestions) => dispatch(setSuggestions(suggestions))
  );
  const [
    _fetchUserSuggestionsErrors,
  ] = useGetUserSuggestionsFetchOnce(isAuthenticated, (userSuggestions) =>
    dispatch(setUserSuggestions(userSuggestions))
  );
  const [_fetchGetProfileInfoErrors] = useGetProfileDataFetchOnce(
    (profileInfo) => {
      dispatch(
        setProfileInfo({
          screenName: profileInfo.profile.screenName,
          email: profileInfo.profile.email,
        })
      );
    }
  );
  useEffect(() => {
    const {isImpersonated, roles} = GetImpersonatedUser();
    dispatch(setImpersonationMode(isImpersonated, { roles: roles }));
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes />
      <SuggestionsLoading />
      <AddResourceConfirmModal />
      <ChangeSettingConfirmModal />
      <QuestionSaveConfirmModal />
    </React.Fragment>
  );
}

export default hot(module)(App);
