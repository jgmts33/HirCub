import jwtDecode from 'jwt-decode';
import fontSizes from '~/consts/fontSizes';
import {
  SET_FONT_SIZE,
  SET_OPEN_MENU,
  CLOSE_WELCOME_MODALS,
  SET_BASIC_INFO,
  SET_SHOW_ADDED_PROMPT,
  SET_SHOW_SETTING_PROMPT,
  SET_SHOW_QUESTION_PROMPT,
  SET_PROFILE_INFO,
} from '~/actions/global';
import { SET_AUTHENTICATED, LOGIN } from '~/actions/account';

const initialState = {
  fontSize: fontSizes.normal,
  isOpened: false,
  isShowedAddedPrompt: false,
  isShowedSettingPrompt: false,
  isShowedQuestionPrompt: false,
  suggestions: [],
};

function global(state = initialState, action) {
  switch (action.type) {
    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload,
      };
    case SET_OPEN_MENU:
      return {
        ...state,
        isOpened: action.payload,
        isLogin: action.payload,
      };
    case SET_AUTHENTICATED:
      const { authToken, isLogin } = action.payload;
      const decoded = jwtDecode(authToken);
      return {
        ...state,
        userName: decoded.user_name,
        userId: decoded.user_id,
        postalCode: decoded.postal_code,
        accountType: decoded.account_type,
        showWelcomeModals: isLogin,
        backgroundImageId: decoded.background_id,
        profileColor: decoded.profile_color,
      };
    case LOGIN: {
      const {
        loginResult: { authToken, basicInfo },
        isLogin,
      } = action.payload;
      const decoded = jwtDecode(authToken);
      return {
        ...state,
        userName: decoded.user_name,
        userId: decoded.user_id,
        postalCode: decoded.postal_code,
        accountType: decoded.account_type,
        showWelcomeModals: isLogin,
        ...basicInfo,
      };
    }
    case CLOSE_WELCOME_MODALS:
      return {
        ...state,
        showWelcomeModals: false,
      };
    case SET_BASIC_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SHOW_ADDED_PROMPT:
      return {
        ...state,
        isShowedAddedPrompt: action.payload,
      };
    case SET_SHOW_SETTING_PROMPT:
      return {
        ...state,
        isShowedSettingPrompt: action.payload,
      };
    case SET_SHOW_QUESTION_PROMPT:
      return {
        ...state,
        isShowedQuestionPrompt: action.payload,
      };
    case SET_PROFILE_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default global;
