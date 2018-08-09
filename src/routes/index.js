import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConnectedLogin from '../views/Login/Login';
import RequestsPage from '../views/RequestsPage/RequestsPage';
import RequireAuth from '../hoc/authHoc';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <Route path="/requests" exact component={RequireAuth(RequestsPage)} />
    <Route path="/settings" component={RequireAuth(RequestsPage)} />
    {
      // FIX: The following routes to move to Requests once their components are developed
    }
    <Route path="/requests/my-requests" exact component={RequireAuth(RequestsPage)} />
    <Route path="/requests/my-approvals" exact component={RequireAuth(RequestsPage)} />
  </Switch>

);

export default Routes;
