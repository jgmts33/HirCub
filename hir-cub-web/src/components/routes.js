import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './appRoute';
const Dashboard = React.lazy(() => import('~/pages/dashboard'));
const Login = React.lazy(() => import('~/pages/login'));
const Register = React.lazy(() => import('~/pages/register'));
const IntakeManager = React.lazy(() => import('~/pages/intakeManager'));
const Reports = React.lazy(() => import('~/pages/reports'));
const Calendar = React.lazy(() => import('~/pages/calendar'));
const Profile = React.lazy(() => import('~/pages/profile'));
const PageError = React.lazy(() => import('~/pages/error'));
const FrontPage = React.lazy(() => import('~/pages/front'));
const Features = React.lazy(() => import('~/pages/features'));
const HelpPage = React.lazy(() => import('~/pages/help'));
const RulesPage = React.lazy(() => import('~/pages/rules'));

const Routes = () => (
  <Switch>
    <AppRoute exact path="/" component={FrontPage} keepGuestLayout isLandingPage isPublic />
    <AppRoute path="/welcome" component={Dashboard} />
    <AppRoute path="/library" component={Dashboard} />
    <AppRoute path="/notes" component={Dashboard} />
    <AppRoute path="/note/:id" component={Dashboard} />
    <AppRoute path="/add-note" component={Dashboard} />
    <AppRoute path="/expenses" component={Dashboard} />
    <AppRoute path="/health-tracker" component={Dashboard} />
    <AppRoute path="/medication-tracker" component={Dashboard} />
    <AppRoute path="/care-needs-tool" component={Dashboard} />
    <AppRoute path="/features" component={Features} isLandingPage />
    <AppRoute path="/help" component={HelpPage} keepGuestLayout isLandingPage isPublic />
    <AppRoute path="/about-us" component={RulesPage} keepGuestLayout isLandingPage isPublic />
    <AppRoute path="/login" component={Login} isPublic keepGuestLayout />
    <AppRoute path="/sign-up" component={Register} isPublic keepGuestLayout />
    <AppRoute path="/intake-manager" component={IntakeManager} />
    <AppRoute path="/reports" component={Reports} />
    <AppRoute path="/reports/symptoms" component={Reports} />
    <AppRoute path="/reports/concerns" component={Reports} />
    <AppRoute path="/reports/happiness" component={Reports} />
    <AppRoute path="/reports/mobility" component={Reports} />
    <AppRoute path="/reports/caregiver-experience" component={Reports} />
    <AppRoute path="/calendar" component={Calendar} />
    <AppRoute path="/calendar_add" component={Calendar} />
    <AppRoute path="/calendar/:date" component={Calendar} />
    <AppRoute path="/calendar_add/:date" component={Calendar} />
    <AppRoute path="/profile" component={Profile} />
    <AppRoute path="/profile/:id" component={Profile} />
    <AppRoute path="/:path" component={PageError} />
  </Switch>
);

export default Routes;
