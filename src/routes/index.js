import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from '../views/Login/Login';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
  </Switch>
);
export default Routes;
