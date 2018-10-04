import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import BedGeomWrapper from '../BedGeomWrapper';
import './RoomGeomWrapper.scss';

class RoomGeomWrapper extends PureComponent {
  render() {
    const {beds, timelineStartDate, tripDayWidth, timelineViewType} = this.props;
    const bedGeoms = beds.map(bed => (
      <BedGeomWrapper
        key={bed.id}
        trips={bed.trips}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
      />
    ));
    return (
      <div className="room-geometry-wrapper">
        <div className="room-status-bar item-row" />
        {bedGeoms}
      </div>
    );
  }
}

RoomGeomWrapper.propTypes = {
  beds: PropTypes.object.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string
};

RoomGeomWrapper.defaultProps = {
  timelineViewType: 'month'
};

export default RoomGeomWrapper;
