import React, {PureComponent} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import GuestHouse from '../../components/GuestHouse';

const guestHousesData = [
  {
    id: 'nNBggMqL_'
  },
  {
    id: 'eiW1bxnZk'
  },
  {
    id: 'YOR40g3m6'
  }
];

// FIXME: replace once we have a guest housees view ready
class GuestHouses extends PureComponent {
  render() {
    const guestHouses = guestHousesData.map(guestHouse => {
      return <GuestHouse key={guestHouse.id} id={guestHouse.id} />;
    });
    return guestHouses;
  }
}

export default withRouter(GuestHouses);
