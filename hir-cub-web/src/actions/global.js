export const SET_FONT_SIZE = '@global/setFontSize';
export const SET_OPEN_MENU = '@global/openMenu';
export const setFontSize = fontSize => ({
  type: SET_FONT_SIZE,
  payload: fontSize,
});

export const openMenu = isOpened => ({
  type: SET_OPEN_MENU,
  payload: isOpened,
});

export const CLOSE_WELCOME_MODALS = '@global/closeWelcomeModals';

export const closeWelcomeModals = () => ({
  type: CLOSE_WELCOME_MODALS,
});

export const SET_BASIC_INFO = '@global/setBasicInfo';

export const setBasicInfo = basicInfo => ({
  type: SET_BASIC_INFO,
  payload: basicInfo,
});

export const SET_SHOW_ADDED_PROMPT = '@global/showAddedPrompt';
export const showAddedPrompt = isShowedAddedPrompt => ({
  type: SET_SHOW_ADDED_PROMPT,
  payload: isShowedAddedPrompt,
});

export const SET_SHOW_SETTING_PROMPT = '@global/showSettingPrompt';
export const showSettingPrompt = isShowedSettingPrompt => ({
  type: SET_SHOW_SETTING_PROMPT,
  payload: isShowedSettingPrompt,
});

export const SET_SHOW_QUESTION_PROMPT = '@global/showQuestionPrompt';
export const showQuestionPrompt = isShowedQuestionPrompt => ({
  type: SET_SHOW_QUESTION_PROMPT,
  payload: isShowedQuestionPrompt,
});

export const SET_PROFILE_INFO = '@global/setProfileInfo';
export const setProfileInfo = profileInfo => ({
  type: SET_PROFILE_INFO,
  payload: profileInfo,
});
