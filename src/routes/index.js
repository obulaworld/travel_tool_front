import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from '../views/Login/Login';
import Requests from '../views/RequestsPage/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/requests" component={Requests} />
  </Switch>
);
export default Routes;

