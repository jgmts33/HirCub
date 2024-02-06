import React from 'react';
import { PermissionType } from './permissions';

import { ReactComponent as Welcome } from '~/assets/svg/Welcome.svg';
import { ReactComponent as Library } from '~/assets/svg/Library.svg';
import { ReactComponent as Notes } from '~/assets/svg/Notes.svg';
import { ReactComponent as Expenses } from '~/assets/svg/Expenses.svg';
import { ReactComponent as Health } from '~/assets/svg/Health.svg';
import { ReactComponent as Medication } from '~/assets/svg/Medication.svg';

export const MenuLinks = [
  {
    title: 'Home',
    url: 'welcome',
  },
  {
    title: 'My Profile',
    url: 'profile',
  },
  {
    title: 'My Caregiving Needs',
    url: 'profile/caregiving-needs',
  },
  {
    title: 'My Calendar',
    url: 'calendar',
  },
  {
    title: 'Library',
    url: 'library',
  },
  {
    title: 'My Health Reports',
    url: 'reports',
  },
  {
    title: 'My Journal',
    url: 'notes',
  },
  {
    title: 'Expenses',
    url: 'expenses',
  },
  {
    title: 'My Medication Tracker',
    url: 'medication-tracker',
  },
  {
    title: 'My Health Tracker',
    url: 'health-tracker',
  },
];

export const DashboardTabList = [
  {
    tabKey: PermissionType.Welcome,
    label: 'Welcome',
    url: 'welcome',
    icon: <Welcome />,
  },
  {
    tabKey: PermissionType.Library,
    label: 'Library',
    url: 'library',
    icon: <Library />,
  },
  {
    tabKey: PermissionType.JournalEntry,
    label: 'Notes',
    url: 'notes',
    icon: <Notes />,
  },
  {
    tabKey: PermissionType.Expenses,
    label: 'Expenses',
    url: 'expenses',
    icon: <Expenses />,
  },
  {
    tabKey: PermissionType.HealthTracker,
    label: 'Health tracker',
    url: 'health-tracker',
    icon: <Health />,
  },
  {
    tabKey: PermissionType.MedicationTracker,
    label: 'Medication tracker',
    url: 'medication-tracker',
    icon: <Medication />,
  },
  {
    tabKey: PermissionType.MobilityTracker,
    label: 'Care Needs Tool',
    url: 'care-needs-tool',
    icon: <Medication />,
  },
];

export const PatientExceptionUrls = ['profile/caregiving-needs'];
export const CaregiverExceptionUrls = ['health-tracker', 'medication-tracker', 'mobility-tracker'];
