import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import generateDynamicDate from '../../../helper/generateDynamicDate';
import TripDetail from './TripDetail';

export default class TripDetails extends PureComponent {
  static propTypes = {
    tripDetails: PropTypes.object.isRequired
  }
  renderTripDetails = (
    origin, destination, tripDetails, departureDate, tripType, returnDate, accomodationDetails
  ) => (
    <React.Fragment>
      <div>
        <TripDetail
          label="From"
          value={origin} />
      </div>
      <div>
        <TripDetail
          label="Travel to"
          value={destination} />
      </div>
      <div>
        <TripDetail
          label="Departure date"
          value={generateDynamicDate(tripDetails, departureDate)} />
      </div>
      <div id="return-date">
        { tripType !== 'oneWay' ?
          (<TripDetail
            label="Return date"
            value={generateDynamicDate(tripDetails, returnDate)} />
          )  : ''
        }
      </div>
      <div id="trip-detail">
        <TripDetail
          label="Accomodation"
          value={accomodationDetails} />
      </div>
    </React.Fragment>
  )
  renderTrips() {
    const { tripDetails } = this.props;
    const {
      beds,
      createdAt,
      departureDate,
      returnDate,
      destination,
      origin,
      tripType
    } = tripDetails;
    let accomodationDetails='None';
    if(beds){
      const {rooms:{roomName, guestHouses:{houseName}}, bedName } = beds;
      accomodationDetails = `${houseName}, ${roomName}, ${bedName}`;
    }
    return (
      <div className={`modal__modal-trip-details ${tripType}`}>
        {this.renderTripDetails(
          origin, destination, tripDetails, departureDate, tripType, returnDate, accomodationDetails
        )}
      </div>
    );
  }

  render() {
    return this.renderTrips();
  }
}
