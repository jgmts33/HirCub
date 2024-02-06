import React from 'react';
import { useScheduleNotificationRequest } from '~/hooks/requests';
import TrackingNotificationsForm from './trackingNotificationsForm';

function TrackingNotifications() {
  const { errors, sendRequest } = useScheduleNotificationRequest(
    handleSubmitSuccess
  );
  function handleSubmitSuccess() {
    alert('Notifications have been successfully scheduled.');
  }
  function handleSubmit(formData) {
    sendRequest(formData);
  }
  return (
    <div className="filter-form-group sm-px-40 px-15 mb-50">
      <div className="text-center">
        <i className="fas fa-calendar-check text-dark-blue font-24 mx-5" />
        <b>Schedule health tracking notifications?</b>
      </div>
      <div className="mt-20">
        <TrackingNotificationsForm
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
}

export default TrackingNotifications;
