import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '~/appState';
import useAppState from '~/appState';
import { Form } from 'react-final-form';
import { Button } from '../ui';
import { PermissionType, AccountType } from '~/consts';
import { usePermission } from '~/hooks';
import { showQuestionPrompt } from '~/actions/global';

import './styles.scss';
import ProfileQuestionAccount from '../profileQuestion/profileQuestionAccount';
import { FormContextProvider } from '~/utils/formState';
import Loader from '../Loader';
import { usePostProfileDataRequest } from '~/hooks/requests';

function ProfileInfo({ profileData }) {
  const dispatch = useAppDispatch();
  const {
    global: { accountType },
  } = useAppState();
  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.Profile
  );

  const [formValues, setFormValues] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, sendRequest } = usePostProfileDataRequest(
    handleSubmitSuccess
  );

  function handleSubmitSuccess() {
    dispatch(showQuestionPrompt(true));
    setSubmitting(false);

    if (accountType === AccountType.CareGiver) {
      window.open('/profile/caregiving-needs', '_self');
    }
  }
  const handleSubmit = (values) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);

    let profileValues = {
      screenName: values.screenName,
      postalCode: values.postalCode,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      profileColor: values.profileColorInput
        ? values.profileColorInput.hex
        : values.profileColor,
      backgroundImageCode: values.backgroundImage
        ? Number(values.backgroundImage) - 1
        : values.backgroundImageCode,
    };

    sendRequest({ profile: profileValues });
  };

  const updateProfile = () => {
    setFormValues({
      ...profileData,
      backgroundImage: profileData.backgroundImageCode
        ? `${profileData.backgroundImageCode + 1}`
        : '1',
    });
  };

  useEffect(() => {
    updateProfile();
  }, []);

  useEffect(() => {
    setSubmitting(false);
  }, [errors]);

  return (
    <div className="profile">
      <div className="profile_title">My Account</div>
      <div className="profile_subtitle">
        information about updating your profile.
      </div>
      <Form onSubmit={handleSubmit} initialValues={formValues}>
        {({ handleSubmit, submitting, values, touched, errors }) => (
          <FormContextProvider
            values={values}
            errors={errors}
            touched={touched}
          >
            <form onSubmit={handleSubmit} className="profile_entry-form">
              <ProfileQuestionAccount profileData={profileData} />

              <div className="profile_btn-save">
                {(!isImpersonationMode || isWriteAllowed) && (
                  <Button type="submit" kind="purpure" disabled={submitting}>
                    <i className="fas fa-lock" />
                    Update/Save
                  </Button>
                )}
              </div>
            </form>
          </FormContextProvider>
        )}
      </Form>
      {isSubmitting && <Loader />}
      <hr />
    </div>
  );
}

export default ProfileInfo;
