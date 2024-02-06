import React from 'react';
import Avatar from 'react-avatar';
import { PROFILE_IMAGE_URL } from '~/consts/urls';

function AvatarGroup({ avatars }) {
  return (
    <div className="carehub-avatar-group">
      {avatars.map((avatar) => {
        return (
          <div className="carehub-avatar">
            <Avatar
              className="sub-avatar"
              name={avatar.name}
              size="50"
              round={true}
              src={`${PROFILE_IMAGE_URL}?userId=${avatar.userId}`}
              style={{
                backgroundColor:
                  avatar.profileColor === null
                    ? '#3fb4c4'
                    : avatar.profileColor,
                border: 'solid 4px #fff',
              }}
            />
            <div className="avatarName" title={avatar.name}>
              {avatar.name.substr(0, 1).toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AvatarGroup;
