import React from 'react';
import Select from 'react-select';
import { PermissionAllow } from '~/consts';
import './styles.scss';

function ProfileShareItem(props) {
  const { item, onChange } = props;

  const profileShareTitles = [
    { name: 'library', value: 'Library' },
    { name: 'notes', value: 'Notes' },
    { name: 'expense', value: 'Expense Tracker' },
    { name: 'health', value: 'Health Tracker' },
    { name: 'medication', value: 'Medication Tracker' },
    { name: 'mobility', value: 'Care Needs Tool' },
    { name: 'profile', value: 'Profile' },
    { name: 'calendar', value: 'Calendar' },
  ];

  const statusList = [
    { value: PermissionAllow.Write, label: 'Edit' },
    { value: PermissionAllow.Read, label: 'View only' },
    { value: PermissionAllow.None, label: 'Hide' },
  ];

  const changeStatus = (value, action) => {
    onChange(action.name, value.value);
  };

  const getStatus = (title) => {
    if (item[title.name]) {
      return statusList.find((status) => status.value == item[title.name]);
    }
    return statusList[0];
  };

  const renderItem = (title, key) => {
    return (
      <div key={key} className="profile-share_element display-flex">
        <div className="profile-share_value">
          <span>{title.value}</span>
          <Select
            name={title.name}
            options={statusList}
            value={getStatus(title)}
            onChange={changeStatus}
            className="profile-select"
            classNamePrefix="select"
            isSearchable={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="profile-share_group">
      <div className="profile-share_form">
        <div className="profile-share_col">
          {profileShareTitles.map((title, i) => {
            return renderItem(title, i);
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileShareItem;
