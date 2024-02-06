import React from 'react';

import WelcomeModals from '~/components/welcomeModals';
import AsideCalendar from '~/components/asideCalendar';
import DashboardPage from '~/components/DashboardPage';

import { PermissionType } from '~/consts';
import { usePermission } from '~/hooks';

const Dashboard = () => {
  const { isImpersonationMode, isAccessAllowed } = usePermission(
    PermissionType.Calendar
  );

  return (
    <React.Fragment>
      <WelcomeModals />
      <div className="page dashbord-page page-has-separate-bg relative md-pb-50 lg-pb-30 sm-pb-20">
        <div className="dashbord-page-content">
          <div className="container flex flex-jc">
            {(!isImpersonationMode || isAccessAllowed) && (
              <AsideCalendar
                onView={(date) => {
                  window.open(`/calendar/${date}`, '_self');
                }}
                onAddEvent={(date) => {
                  window.open(`/calendar_add/${date}`, '_self');
                }}
              />
            )}
            <DashboardPage />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
