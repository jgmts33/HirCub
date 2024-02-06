import React from 'react';
import { useAppDispatch } from '~/appState';
import { useLoginRequest } from '~/hooks/requests';
import { login } from '~/actions/account';
import LoginForm from '~/components/loginForm';

// helpers
import jwtDecode from 'jwt-decode';
import { trackGTM } from '~/utils';

// constants
import { TRACK_GTM } from '~/consts';

function Login(props) {
  // const { history } = props;
  const dispatch = useAppDispatch();
  const { errors, sendRequest } = useLoginRequest(handleSubmitSuccess);

  function handleSubmitSuccess(loginResult) {
    const { authToken, firstLogin } = loginResult;
    const decoded = jwtDecode(authToken);
    localStorage.setItem('authToken', authToken);

    dispatch(login(loginResult, true));
    trackGTM(TRACK_GTM.LOGIN, {
      userId: decoded.user_id,
    });
    if (firstLogin === true) {
      window.location.href = '/profile';
    } else {
      window.location.href = '/';
    }
  }

  function handleSubmit(formData) {
    sendRequest(formData);
  }

  return (
    <React.Fragment>
      <div className="page login-page md-pb-50 lg-pb-30 sm-pb-20">
        <div className="page-panel-group-container">
          <div className="text-center mb-50">
            <p className="page-title text-white">Log In</p>
            <p className="page-sub-title">
              Sign In today for your personalized CareHub.
            </p>
          </div>
          <div className="page-panel-group">
            <LoginForm
              errors={errors}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
