import React, { useEffect, useMemo } from 'react';
import {
  SuggestionStatus,
  programsAndServices as hardcodedProgramsAndServices,
  questions as hardcodedQuestions,
} from '~/consts';
import useAppState, { useAppDispatch } from '~/appState';
import {
  setQuestions,
  setUserSuggestions,
  setProgramsAndServices,
  updateSuggestion,
  updateProgram,
} from '~/actions/library';
import {
  useGetUserSuggestionsFetchOnce,
  useSetSuggestionStatusRequest,
} from '~/hooks/requests';

import { LibraryForm } from '~/components/library';

// helpers
import { trackGTM } from '~/utils';

// constants
import { TRACK_GTM } from '~/consts';

function Library() {
  const {
    global: { userId },
    account: { isAuthenticated },
    library: { userSuggestions, programsAndServices },
  } = useAppState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setQuestions(hardcodedQuestions));
    dispatch(
      setProgramsAndServices(
        hardcodedProgramsAndServices.map(e => ({ ...e, status: 1 }))
      )
    );
    // eslint-disable-next-line
  }, []);
  const [_fetchSuggestionsErrors] = useGetUserSuggestionsFetchOnce(
    isAuthenticated,
    res => {
      trackGTM(TRACK_GTM.ACCESS_LIBRARY, {
        numberOfSuggestions: res.length,
        userId,
      });
      dispatch(setUserSuggestions(res));
    }
  );
  const {
    todaysSuggestions,
    favoriteSuggestions,
    archivedSuggestions,
  } = useMemo(() => {
    if (!userSuggestions) {
      return {};
    }
    const todaysSuggestions = userSuggestions.filter(
      s => s.status === SuggestionStatus.Todays
    );
    const favoriteSuggestions = userSuggestions.filter(
      s => s.status === SuggestionStatus.Favorite
    );
    const archivedSuggestions = userSuggestions.filter(
      s => s.status === SuggestionStatus.Archived
    );
    return { todaysSuggestions, favoriteSuggestions, archivedSuggestions };
  }, [userSuggestions]);
  const {
    todaysProgramsAndServices,
    favoriteProgramsAndServices,
    archivedProgramsAndServices,
  } = useMemo(() => {
    if (!programsAndServices) {
      return {};
    }
    const todaysProgramsAndServices = programsAndServices.filter(
      ps => ps.status === SuggestionStatus.Todays
    );
    const favoriteProgramsAndServices = programsAndServices.filter(
      ps => ps.status === SuggestionStatus.Favorite
    );
    const archivedProgramsAndServices = programsAndServices.filter(
      ps => ps.status === SuggestionStatus.Archived
    );
    return {
      todaysProgramsAndServices,
      favoriteProgramsAndServices,
      archivedProgramsAndServices,
    };
  }, [programsAndServices]);
  const {
    sendRequest: sendSetSuggestionStateRequest,
  } = useSetSuggestionStatusRequest(handleChangeStatusSuccess);
  function handleChangeStatusSuccess(res, id, status) {
    dispatch(updateSuggestion(id, status));
  }
  function handleUpdateProgram(id, status) {
    dispatch(updateProgram(id, status));
  }

  return (
    <div className="page library-page page-has-separate-bg md-pb-50 lg-pb-30 sm-pb-20 relative">
      <LibraryForm />
    </div>
  );
}

export default Library;
