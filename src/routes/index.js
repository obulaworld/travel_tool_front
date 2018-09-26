import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login';
import ConnectedRequests from '../views/Requests';
import RequireAuth from '../hoc/authHoc';
import ConnectedApprovals from '../views/Approvals';
import Checkbox from '../components/CheckBox';
import ConnectedRole from '../views/Role';
import ConnectedUserProfile from '../views/UserProfile';
import LayoutShell from '../hoc/Layout';


const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={ConnectedLogin}
    />
    <Route>
      <LayoutShell>
        <Switch>
          <Route
            path="/requests/my-approvals"
            exact
            component={RequireAuth(ConnectedApprovals)}
          />
          <Route
            path="/requests"
            exact
            component={RequireAuth(ConnectedRequests)}
          />
          <Route
            path="/settings/roles"
            exact
            component={RequireAuth(ConnectedRole)}
          />
          <Route
            path="/requests/:requestId"
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

        </Switch>
      </LayoutShell>
    </Route>
  </Switch>
);

export default Routes;
