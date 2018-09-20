import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import generateDynamicDate from '../../../helper/generateDynamicDate';
import TripDetail from './TripDetail';

export default class TripDetails extends PureComponent {
  static propTypes = {
    tripDetails: PropTypes.object.isRequired
  }

  renderTrips() {
    const { tripDetails } = this.props;
    const {
      createdAt,
      departureDate,
      returnDate,
      destination,
      origin,
      tripType
    } = tripDetails;
    return (
      <div className={`modal__modal-trip-details ${tripType}`}>
        <TripDetail
          label="Travel to"
          value={destination} />
        <TripDetail
          label="From"
          value={origin} />
        <TripDetail
          label="Depature date"
          value={generateDynamicDate(tripDetails, departureDate)} />
        <div id="return-date">
          { tripType !== 'oneWay' ? 
            (<TripDetail
              label="Return date"
              value={generateDynamicDate(tripDetails, returnDate)} />
            )  : '' 
          }
        </div>
      </div>
    );
  }

  render() {
    return this.renderTrips();
  }
}
