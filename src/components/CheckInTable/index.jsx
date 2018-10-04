import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import Utils from '../../helper/Utils';
import './CheckInTable.scss';

export class CheckInTable extends Component {

  handleCheck = (tripId, checkType) => {
    const { handleCheckStatus } = this.props;
    handleCheckStatus(tripId, checkType);

  }
  renderCheckIns(trip) {
    return (
      <tr key={trip.id} className="table__row">
        <td
          className="mdl-data-table__cell--non-numeric table__data"
        >
          {Utils.generateTripRoomName(trip)}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          {Utils.generateTripDuration(trip)}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data table__button-column">
          {trip.checkStatus === 'Not Checked In' && (
            <button
              id="btnCheck"
              className="table__button-checkin"
              onClick={() => {this.handleCheck(trip.id, 'checkIn');}}
              type="button">
              Check-in
            </button>
          )}
        </td>
      </tr>
    );
  }

  renderNoCheckIn(message) {
    return <div className="table__trips--empty">{message}</div>;
  }

  renderError(error) {
    return <div className="table__trips--error">{error}</div>;
  }
  render() {
    const { trips, tripError } = this.props;
    return (
      <Fragment>
        <div className="table__container padding-top">
          {tripError && this.renderError(tripError)}
          {trips &&
            trips.length > 0 && (
            <table className="mdl-data-table mdl-js-data-table table__trips">
              <tbody className="table__body">
                {trips.map(trip => this.renderCheckIns(trip))}
              </tbody>
            </table>
          )}
          {!trips.length &&
            this.renderNoCheckIn('You have no check-in record yet')}
        </div>
      </Fragment>
    );
  }
}

CheckInTable.propTypes = {
  trips: PropTypes.array,
  tripError: PropTypes.string,
  handleCheckStatus: PropTypes.func.isRequired
};

CheckInTable.defaultProps = {
  trips: [],
  tripError: ''
};

export default withLoading(CheckInTable);
