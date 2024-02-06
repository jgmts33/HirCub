import React, { useState } from 'react';
import { useAppDispatch } from '~/appState';
import { Field, Form } from 'react-final-form';
import { Input } from '../ui/formControls';
import ProfileShareItem from '../profileShareItem';
import { Button } from '../ui';

import { useSetNameImpersonate } from '~/hooks/requests';
import { showSettingPrompt } from '~/actions/global';
import Loader from '../Loader';

import './styles.scss';
import { PermissionAllow, PermissionType } from '~/consts';
import { emailValidation } from '~/consts/validation';
import ErrorsBlock from '../shared/errorsBlock';
import { postInviteRequest } from '~/requests/sharedAccess';

const pushPermissionRole = (roles, mode, type) => {
  if (mode) {
    if (mode == PermissionAllow.Read) {
      roles.push(type + PermissionAllow.Read);
    } else if (mode == PermissionAllow.Write) {
      roles.push(type + PermissionAllow.Write);
    }
  }
};

function getRoles(info) {
  let roles = [];

  pushPermissionRole(roles, info.library, PermissionType.Library);
  pushPermissionRole(roles, info.notes, PermissionType.JournalEntry);
  pushPermissionRole(roles, info.expense, PermissionType.Expenses);
  pushPermissionRole(roles, info.health, PermissionType.HealthTracker);
  pushPermissionRole(roles, info.medication, PermissionType.MedicationTracker);
  pushPermissionRole(roles, info.profile, PermissionType.Profile);
  pushPermissionRole(roles, info.calendar, PermissionType.Calendar);
  pushPermissionRole(roles, info.mobility, PermissionType.MobilityTracker);

  return roles;
}

function validate(values) {
  let errors = {};

  const emailError = emailValidation(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const confirmError = emailValidation(values.confirm);
  if (confirmError) {
    errors.confirm = confirmError;
  } else {
    if (values.email !== values.confirm) {
      errors.confirm = 'Emails do not match.';
    }
  }

  return errors;
}

function ProfileShare() {
  const dispatch = useAppDispatch();
  const { sendRequest: sendNameRequest } = useSetNameImpersonate();
  const [serverErrors, setSeverErrors] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const [shareUser, setShareUser] = useState({
    name: PermissionAllow.Write,
    email: PermissionAllow.Write,
    library: PermissionAllow.Write,
    notes: PermissionAllow.Write,
    expense: PermissionAllow.Write,
    health: PermissionAllow.Write,
    medication: PermissionAllow.Write,
    profile: PermissionAllow.Write,
    calendar: PermissionAllow.Write,
    mobility: PermissionAllow.Write,
  });

  const handleSubmit = (values) => {
    if (isSubmitting) {
      return;
    }
    setSeverErrors(null);
    setSubmitting(true);
    setFormValues({ ...formValues });

    let inviteParams = {
      email: values.email,
      roles: getRoles(shareUser),
    };

    let nameParams = {
      name: values.name,
      email: values.email,
    };

    postInviteRequest(inviteParams)
      .then((res) => {
        dispatch(showSettingPrompt(true));
        setSubmitting(false);
      })
      .catch((err) => {
        console.error('err', err);
        setSeverErrors(err);
        setSubmitting(false);
      });

    sendNameRequest(nameParams);
  };

  function handleSubmitSuccess(res, formData) {
    dispatch(showSettingPrompt(true));
    setSubmitting(false);
  }

  const onChange = (key, value) => {
    let data = { ...shareUser };
    data[key] = value;
    setShareUser(data);
  };

  const renderShareInfo = (title, child) => {
    return (
      <div className="profile-share_info-element">
        <div className="profile-share_info-title">{title}</div>
        <div className="profile-share_info-value">{child}</div>
      </div>
    );
  };

  const renderShareInfoInput = (title, name, placeholder) => {
    return renderShareInfo(
      title,
      <Field
        type="text"
        name={name}
        placeholder={placeholder}
        component={Input}
      />
    );
  };

  return (
    <div className="profile-share">
      <div className="profile-share_title">Sharing your CareHub</div>
      <div className="profile-share_subtitle">
        Information about sharing your profile and add users. Email notification
        will be sent so user can create their own password etc.
      </div>

      <Form
        onSubmit={handleSubmit}
        initialValues={formValues}
        validate={validate}
      >
        {({ handleSubmit, submitting, touched, errors }) => (
          <form onSubmit={handleSubmit} className="profile-share_entry-form">
            <div className="profile-share_group">
              <div className="profile-share_info">
                <div className="profile-share_info-col">
                  {renderShareInfoInput('User Name:', 'name', 'Name')}
                </div>

                <div className="profile-share_info-col">
                  {renderShareInfoInput('Email:', 'email', 'Email')}
                  {renderShareInfoInput('Confirm:', 'confirm', 'Confirm Email')}
                </div>

                <div className="profile-share_info-col">
                  <ErrorsBlock errors={serverErrors} />
                </div>
              </div>

              <div className="profile-share_description">
                <b>
                  User access - select below to determine what the user can view
                  or write/contribute to:
                </b>
                <br />
                <b>View only: </b>User can view data but not add or edit the
                data
                <br />
                <b>Edit: </b>User can view and add or edit the data
                <br />
                <b>Hide: </b>User will not be able to see the feature
              </div>

              <div className="profile-share_share-list">
                <ProfileShareItem
                  key={shareUser.name}
                  item={shareUser}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="profile-share_btn-save">
              <Button type="submit" kind="purpure" disabled={submitting}>
                <i className="fas fa-lock" />
                Update/Save
              </Button>
            </div>
          </form>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
}

export default ProfileShare;
