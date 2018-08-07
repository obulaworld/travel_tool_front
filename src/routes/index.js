import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from '../views/Login/Login';
import RequestsPage from '../views/RequestsPage';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/requests" component={RequestsPage} />
  </Switch>
);
export default Routes;
