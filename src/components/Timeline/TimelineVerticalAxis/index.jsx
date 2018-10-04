import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import RoomLabel from './RoomLabel';
import './TimelineVerticalAxis.scss';

class TimelineVerticalAxis extends PureComponent {
  render() {
    const {rooms} = this.props;
    const roomAxisLabels = rooms.map(room => (
      <div key={room.id} className="room-axis-wrapper">
        <RoomLabel name={room.roomName} />
        {room.beds.map(bed => (
          <div key={bed.id} className="bed-name item-row">
            <div>{bed.bedName}</div>
          </div>
        ))}
      </div>
    ));
    return (
      <div className="vertical-axis">
        {roomAxisLabels}
      </div>
    );
  }
}

TimelineVerticalAxis.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default TimelineVerticalAxis;
