import React, { useEffect, useMemo } from 'react';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { AccountType } from '~/consts';
import { useAppDispatch } from '~/appState';
import { useSignUpRequest } from '~/hooks/requests';
import { setAuthenticated } from '~/actions/account';
import RegistrationForm from '~/components/registrationForm';

function Register(props) {
  const {
    // history,
    location: { search },
  } = props;
  const parsed = queryString.parse(search);
  const urlAccountType = parsed.type ? parsed.type : null;
  useEffect(() => {
    if (urlAccountType) {
      localStorage.setItem('accountType', urlAccountType);
    }
  }, [urlAccountType]);
  const dispatch = useAppDispatch();
  const { errors, sendRequest } = useSignUpRequest(handleSubmitSuccess);
  function handleSubmitSuccess(authToken) {
    localStorage.setItem('authToken', authToken);
    localStorage.removeItem('accountType');

    toast.success('User was created successfully.', {
      position: 'top-center',
      autoClose: 3000,
      pauseOnHover: false,
      toastClassName: 'register-modal',
      onClose: () => {
        dispatch(setAuthenticated(authToken));
        window.location.href = '/profile';
      },
    });
  }
  function handleSubmit(formData) {
    const storedAccountType = localStorage.getItem('accountType');
    const accountType = formData.accountType
      ? formData.accountType
      : urlAccountType === AccountType.CareGiver ||
        urlAccountType === AccountType.Patient
      ? urlAccountType
      : storedAccountType
      ? storedAccountType
      : null;
    if (!accountType) {
      toast.error(
        'An error has happened. Please reload the page and try again.'
      );
      return;
    }
    sendRequest({
      ...formData,
      accountType,
    });
  }
  const initialValues = useMemo(
    () => ({
      accountType: urlAccountType,
    }),
    [urlAccountType]
  );
  return (
    <div className="page sign-up-page md-pb-50 lg-pb-30 sm-pb-20">
      <div className="page-panel-group-container">
        <div className="text-center mb-20">
          <p className="page-title text-white"></p>
          <p className="page-sub-title mb-20 font-semibold">
            Sign Up today for your personalized CareHub.
          </p>
          <p className="m-0 font-semibold page-sub-title1">
            Reminder: Save your username and password in a safe location, for
            future reference.
          </p>
        </div>
        <div className="page-panel-group">
          <RegistrationForm
            serverErrors={errors}
            handleSubmit={handleSubmit}
            accountType={urlAccountType}
            initialValues={initialValues}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
