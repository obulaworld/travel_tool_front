import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login';
import ConnectedDashboard from '../views/Dashboard';
import ConnectedRequests from '../views/Requests';
import ConnectedGuestHouseDetails from '../views/Accommodation/FullGuestHouseDetails';
import RequireAuth from '../hoc/authHoc';
import ConnectedApprovals from '../views/Approvals';
import ConnectedVerifications from '../views/Verifications';
import ConnectedRole from '../views/Role';
import ConnectedUserProfile from '../views/UserProfile';
import LayoutShell from '../hoc/Layout';
import ConnectedAccommodation from '../views/Accommodation';
import ConnectedCheckIn from '../views/CheckIn';
import ConnectedChecklist from '../views/Checklist';
import ConnectedRoleDetails from '../views/RoleDetails';
import ConnectedDocuments from '../views/Documents';
import ConnectedReadiness from '../views/Readiness';
import ConnectedTravelReadinessDocuments from '../views/TravelReadinessDocuments';
import ConnectedUserTravelReadinessDetails from '../views/TravelReadinessDocuments/UserTravelReadinessDetails';
import ConnectedHome from '../views/Home';
import ConnectedReminders from '../views/Reminders';
import ConnectedCreateEmailTemplate from '../views/ReminderSetup/CreateEmailTemplate';
import ConnectedReminderSetup from '../views/ReminderSetup';
import UpdateEmailTemplate from '../views/ReminderSetup/UpdateEmailTemplate';
import NotFound from '../views/ErrorPages';
import ConnectedCreateReminder from '../views/Reminders/CreateReminder';

import {
  TRAVEL_ADMINISTRATOR,
  SUPER_ADMINISTRATOR,
  TRAVEL_TEAM_MEMBER,
  MANAGER
} from '../helper/roles';


const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <Route path="/redirect/*" exact component={ConnectedLogin} />
    <Route>
      <LayoutShell>
        <Switch>
          <Route
            path="/dashboard"
            exact
            component={RequireAuth(
              ConnectedDashboard,
              TRAVEL_ADMINISTRATOR,
              SUPER_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER
            )}
          />
          <Route path="/home" exact component={RequireAuth(ConnectedHome)} />
          <Route
            path="/requests/my-approvals"
            exact
            component={RequireAuth(
              ConnectedApprovals,
              SUPER_ADMINISTRATOR,
              MANAGER
            )}
          />
          <Route
            path="/requests/my-verifications"
            exact
            component={RequireAuth(
              ConnectedVerifications,
              SUPER_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER,
              TRAVEL_ADMINISTRATOR
            )}
          />
          <Route
            path="/requests/my-verifications/:requestId"
            exact
            component={RequireAuth(
              ConnectedVerifications,
              SUPER_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER,
              TRAVEL_ADMINISTRATOR
            )}
          />
          <Route
            path="/requests"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/travel_readiness"
            exact
            component={RequireAuth(ConnectedReadiness)}
          />
          <Route
            path="/settings/roles"
            exact
            component={RequireAuth(ConnectedRole, SUPER_ADMINISTRATOR)}
          />
          <Route
            path="/requests/:requestId"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/requests/:requestId/checklist"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/settings/profile"
            exact
            component={RequireAuth(ConnectedUserProfile)}
          />
          <Route
            path="/requests/my-approvals/:requestId"
            exact
            component={RequireAuth(ConnectedApprovals)}
          />
          <Route
            path="/residence/manage"
            exact
            component={RequireAuth(
              ConnectedAccommodation,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR
            )}
          />
          <Route
            path="/residence/manage/guest-houses/:guestHouseId"
            exact
            component={RequireAuth(ConnectedGuestHouseDetails)}
          />
          <Route
            path="/residence/checkin"
            exact
            component={RequireAuth(ConnectedCheckIn)}
          />
          <Route
            path="/checklists"
            exact
            component={RequireAuth(
              ConnectedChecklist,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER
            )}
          />
          <Route
            path="/travel-readiness"
            exact
            component={RequireAuth(
              ConnectedTravelReadinessDocuments,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER
            )}
          />
          <Route
            path="/travel-readiness/:userId"
            exact
            component={RequireAuth(
              ConnectedUserTravelReadinessDetails,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER
            )}
          />
          <Route
            path="/settings/roles/:roleId"
            exact
            component={RequireAuth(
              ConnectedRoleDetails,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR
            )}
          />
          <Route
            path="/settings/reminder-setup"
            exact
            component={
              RequireAuth(
                ConnectedReminderSetup,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/settings/reminder-setup/create"
            exact
            component={
              RequireAuth(
                ConnectedCreateEmailTemplate,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/settings/reminders/create"
            exact
            component={
              RequireAuth(
                ConnectedCreateReminder,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR,
                TRAVEL_TEAM_MEMBER
              )
            }
          />
          <Route
            path="/settings/reminder-setup/update/:templateId"
            exact
            component={
              RequireAuth(
                UpdateEmailTemplate,
                SUPER_ADMINISTRATOR,
                TRAVEL_ADMINISTRATOR
              )
            }
          />
          <Route
            path="/documents"
            exact
            component={RequireAuth(ConnectedDocuments)}
          />
          <Route
            path="/settings/reminders"
            exact
            component={RequireAuth(
              ConnectedReminders,
              SUPER_ADMINISTRATOR,
              TRAVEL_ADMINISTRATOR,
              TRAVEL_TEAM_MEMBER
            )}
          />
          <Route component={RequireAuth(NotFound)} />
        </Switch>
      </LayoutShell>
    </Route>
  </Switch>
);

export default Routes;
