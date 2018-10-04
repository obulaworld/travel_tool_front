import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import TripGeometry from '../TripGeometry';

class BedGeomWrapper extends Component {
  render() {
    const {tripDayWidth, trips, timelineStartDate, timelineViewType} = this.props;
    const tripGeoms = trips.map(trip => (
      <TripGeometry
        key={trip.id}
        tripDayWidth={tripDayWidth}
        timelineStartDate={timelineStartDate}
        trip={trip}
        timelineViewType={timelineViewType}
      />
    ));
    return (
      <div className="bed-geometry-wrapper item-row">
        {tripGeoms}
      </div>
    );
  }
}

BedGeomWrapper.propTypes = {
  tripDayWidth: PropTypes.number.isRequired,
  trips: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  timelineViewType: PropTypes.string
};

BedGeomWrapper.defaultProps = {
  timelineViewType: 'month'
};

export default BedGeomWrapper;
