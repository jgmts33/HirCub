import React, { useEffect, useState } from 'react';
import HeroTitle from '~/components/shared/heroTitle';
import CalendarBlock from '~/components/calendar';

function Calendar(props) {
  const [isAdd, setIsAdd] = useState(props.path !== '/calendar');

  useEffect(() => {
    function handleChangeUrl() {
      setIsAdd(window.location.pathname !== '/calendar');
    }

    window.addEventListener('popstate', handleChangeUrl);

    return () => {
      window.removeEventListener('popstate', handleChangeUrl);
    };
  }, []);

  return (
    <div className="page calendar-page page-has-separate-bg page-has-separate-bg-top-bottom md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeroTitle imageUrl="/img/calendar-logo.png">
          <h1>Calendar</h1>
          <div className="hero-description">
            The calendar function will provide Patients and Caregivers alike,
            with an at-a-glance view of scheduled treatments.
          </div>
        </HeroTitle>
        <CalendarBlock isAdd={isAdd} setIsAdd={setIsAdd} />
      </div>
    </div>
  );
}

export default Calendar;
