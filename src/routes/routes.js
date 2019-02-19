import React from 'react';
import { Route } from 'react-router-dom';
import RequireAuth from '../hoc/authHoc';

import {
  TRAVEL_ADMINISTRATOR,
  SUPER_ADMINISTRATOR,
  TRAVEL_TEAM_MEMBER,
} from '../helper/roles';

import ConnectedTravelStipend from '../views/TravelStipends';

const TravelStipendsRoute = () => (
  <Route
    path="/settings/travelStipends"
    exact
    component={RequireAuth(
      ConnectedTravelStipend,
      SUPER_ADMINISTRATOR,
      TRAVEL_ADMINISTRATOR,
      TRAVEL_TEAM_MEMBER
    )}
  />
);

export default TravelStipendsRoute;
