import React from 'react';
import {Route} from 'react-router-dom';
import _ from 'lodash';
import ConnectedDashboard from '../views/Dashboard';
import ConnectedRequests from '../views/Requests';
import ConnectedNewRequests from '../views/Requests/NewRequests';
import ConnectedGuestHouseDetails from '../views/Accommodation/FullGuestHouseDetails';
import ConnectedApprovals from '../views/Approvals';
import ConnectedVerifications from '../views/Verifications';
import ConnectedRole from '../views/Role';
import ConnectedUserProfile from '../views/UserProfile';
import ConnectedAccommodation from '../views/Accommodation';
import ConnectedCheckIn from '../views/CheckIn';
import ConnectedChecklist from '../views/Checklist';
import ConnectedRoleDetails from '../views/RoleDetails';
import ConnectedReadiness from '../views/Readiness';
import ConnectedTravelReadinessDocuments from '../views/TravelReadinessDocuments';
import ConnectedUserTravelReadinessDetails from '../views/TravelReadinessDocuments/UserTravelReadinessDetails';
import ConnectedHome from '../views/Home';
import ConnectedReminders from '../views/Reminders';
import ConnectedCreateEmailTemplate from '../views/ReminderSetup/CreateEmailTemplate';
import ConnectedReminderSetup from '../views/ReminderSetup';
import UpdateEmailTemplate from '../views/ReminderSetup/UpdateEmailTemplate';
import ConnectedCreateReminder from '../views/Reminders/CreateReminder';
import ConnectedTravelReasons from '../views/TravelReasons';
import ConnectedTravelStipend from '../views/TravelStipends';
import ConnectedApproveRequests from '../views/ApproveRequests';
import RequireAuth from '../hoc/authHoc';


import {
  SUPER_ADMINISTRATOR,
  MANAGER, BUDGET_CHECKER, TRAVEL_MANAGERS
} from '../helper/roles';



const routes = {
  '/dashboard': [ConnectedDashboard, TRAVEL_MANAGERS],
  '/home': [ConnectedHome] ,
  '/requests/my-approvals/': [ConnectedApprovals(), [SUPER_ADMINISTRATOR, MANAGER]],
  '/requests/my-approvals/:requestId': [ConnectedApproveRequests, [SUPER_ADMINISTRATOR, MANAGER]],
  '/requests/budgets/:requestId': [ConnectedApprovals('budget')],
  '/requests/budgets/': [ConnectedApprovals('budget'), [SUPER_ADMINISTRATOR, BUDGET_CHECKER]],
  '/requests/my-verifications': [ConnectedVerifications, TRAVEL_MANAGERS],
  '/requests/my-verifications/:requestId': [ConnectedVerifications, TRAVEL_MANAGERS],
  '/requests': [ConnectedRequests],
  '/requests/new-request': [ConnectedNewRequests],
  '/travel_readiness': [ConnectedReadiness],
  '/settings/roles': [ConnectedRole, [SUPER_ADMINISTRATOR]],
  '/requests/:requestId': [ConnectedRequests],
  '/requests/:requestId/checklist': [ConnectedRequests],
  '/settings/profile': [ConnectedUserProfile],
  '/residence/manage': [ConnectedAccommodation, TRAVEL_MANAGERS],
  '/residence/manage/guest-houses/:guestHouseId': [ConnectedGuestHouseDetails],
  '/residence/checkin': [ConnectedCheckIn],
  '/checklists': [ConnectedChecklist, TRAVEL_MANAGERS],
  '/travel-readiness': [ConnectedTravelReadinessDocuments, TRAVEL_MANAGERS],
  '/travel-readiness/:userId': [ConnectedUserTravelReadinessDetails, TRAVEL_MANAGERS],
  '/settings/roles/:roleId': [ConnectedRoleDetails, TRAVEL_MANAGERS],
  '/settings/reminder-setup': [ConnectedReminderSetup, TRAVEL_MANAGERS],
  '/settings/reminder-setup/create': [ConnectedCreateEmailTemplate, TRAVEL_MANAGERS],
  '/settings/reminders/create': [ConnectedCreateReminder, TRAVEL_MANAGERS],
  '/settings/reminder-setup/update/:templateId': [UpdateEmailTemplate, TRAVEL_MANAGERS],
  '/settings/reminders/edit/:conditionId': [ConnectedCreateReminder, TRAVEL_MANAGERS],
  '/settings/reminders': [ConnectedReminders,TRAVEL_MANAGERS],
  '/settings/travel-reason': [ConnectedTravelReasons, TRAVEL_MANAGERS],
  '/settings/travel-stipends': [ConnectedTravelStipend, TRAVEL_MANAGERS],
};

const buildRoute = (route) => {
  const [ component, auth = [] , ...otherProps] = routes[route];
  return (
    <Route
      path={route}
      key={route}
      exact
      {...otherProps}
      component={RequireAuth( component, ...auth )}
    />
  );
};
export default _.keys(routes).map(buildRoute);

