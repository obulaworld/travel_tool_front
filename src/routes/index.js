import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login/Login';
import RequestsPage from '../views/RequestsPage/RequestsPage';
import RequireAuth from '../hoc/authHoc';
import Approvals from '../views/ApprovalsPage';



const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <Route path="/requests" exact component={RequireAuth(RequestsPage)} />
    <Route path="/requests/my-approvals" exact component={RequireAuth(Approvals)} />
    {
      // FIX: The following routes to move to Requests once their components are developed
    }
  </Switch>
);

export default Routes;
