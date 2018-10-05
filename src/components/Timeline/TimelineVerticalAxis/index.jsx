import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import RoomLabel from './RoomLabel';
import './TimelineVerticalAxis.scss';



class TimelineVerticalAxis extends PureComponent {
  render() {
    const {rooms, updateRoomState, timelineDateRange, guestHouseId} = this.props;
    const roomAxisLabels = rooms.map(room => (
      <div key={room.id} className="room-axis-wrapper">
        <RoomLabel
          name={room.roomName}
          id={room.id}
          status={room.faulty}
          updateRoomState={updateRoomState}
          timelineDateRange={timelineDateRange}
          guestHouseId={guestHouseId}
        />
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
  rooms: PropTypes.array.isRequired,
  updateRoomState: PropTypes.func.isRequired,
  timelineDateRange: PropTypes.array.isRequired,
  guestHouseId: PropTypes.string.isRequired,
};

export default TimelineVerticalAxis;

