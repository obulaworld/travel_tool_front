import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import RoomGeomWrapper from './RoomGeomWrapper';
import './RoomsGeomWrapper.scss';

class RoomsGeomWrapper extends PureComponent {
  render() {
    const {rooms, timelineStartDate, tripDayWidth, timelineViewType, offset} = this.props;
    const roomGeoms = rooms.map(room => (
      <RoomGeomWrapper
        key={room.id}
        offset={offset}
        beds={room.beds}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
      />
    ));
    return (
      <div className="rooms-geometry-wrapper">
        {roomGeoms}
      </div>
    );
  }
}

RoomsGeomWrapper.propTypes = {
  rooms: PropTypes.object.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string,
  offset: PropTypes.number
};

RoomsGeomWrapper.defaultProps = {
  timelineViewType: 'month',
  offset: 0
};

export default RoomsGeomWrapper;
