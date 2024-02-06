import React, { useState } from 'react';
import './profiles.scss';
import {
  renderDisplay,
  renderColorPicker,
  renderText,
  renderPanelGroupTip,
  renderPanelGroup,
  renderPassword,
  renderImageRadio,
} from './common';

import { QuestionTip5, QuestionTip3, BannerList } from './consts';
import useAppState from '~/appState';
import { AccountType, PermissionType } from '~/consts';

import { ReactComponent as Profile } from '~/assets/svg/profile.svg';
import { usePermission } from '~/hooks';

function ProfileQuestionAccount({ profileData }) {
  const {
    global: { accountType },
  } = useAppState();

  const [profileImage, setProfileImage] = useState(null);
  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.Profile
  );

  const renderTextFull = (name, placeholder, disabled) => {
    return (
      <div className="sm-w-1-2 w-full px-0">
        {renderText(name, placeholder, disabled)}
      </div>
    );
  };

  return (
    <div className="question-account question-form">
      <div className="page-panel-group-container">
        {renderPanelGroupTip(
          'What is your name or preferred screen name?',
          QuestionTip5,
          renderTextFull(
            'screenName',
            'Please input your name',
            isImpersonationMode && !isWriteAllowed
          )
        )}

        {renderPanelGroupTip(
          'What is your postal code? Please enter postal code',
          QuestionTip3,
          renderTextFull(
            'postalCode',
            'Please enter postal code',
            isImpersonationMode && !isWriteAllowed
          )
        )}

        {renderPanelGroup('Email', renderTextFull('email', 'Email', true))}

        {renderPanelGroup(
          'User type',
          <span>
            {accountType === AccountType.CareGiver ? 'Caregiver' : 'Patient'}
          </span>
        )}

        {renderPanelGroup(
          'Password',
          <div className="sm-w-1-2 w-full px-0">
            {renderPassword('currentPassword', 'Current Password')}
            {renderPassword('newPassword', 'New Password')}
          </div>
        )}

        {renderPanelGroup(
          'Profile image',
          renderDisplay(
            'profileImage',
            <div className="group-profile-image display-flex">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  width={'40px'}
                  alt=""
                />
              ) : (
                <Profile />
              )}

              <input
                type="file"
                name="profileImage"
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                }}
              />
            </div>
          )
        )}

        {renderPanelGroup(
          'Profile color',
          renderDisplay(
            'profileColor',
            renderColorPicker('profileColorInput', profileData.profileColor)
          )
        )}

        {renderPanelGroup(
          'Background image',
          BannerList.map((item, idx) => {
            return renderImageRadio(
              idx < BannerList.length ? 'w-200 mr-20' : 'w-200 mb-10',
              'backgroundImage',
              `${idx + 1}`,
              item.title,
              item.url
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProfileQuestionAccount;
