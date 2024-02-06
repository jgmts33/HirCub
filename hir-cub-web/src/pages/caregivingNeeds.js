import React from 'react';
import CaregivingForm from '~/components/caregivingForm';
import AsideCalendar from '~/components/asideCalendar';

function CaregivingNeeds() {
  return (
    <div className="intake-manager-page page-has-separate-bg md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container flex flex-jc">
        <AsideCalendar
          onView={(date) => {
            window.open(`/calendar/${date}`, '_self');
          }}
          onAddEvent={(date) => {
            window.open(`/calendar_add/${date}`, '_self');
          }}
        />
        <CaregivingForm />
      </div>
    </div>
  );
}

export default CaregivingNeeds;
