import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import BedGeomWrapper from '../BedGeomWrapper';
import './RoomGeomWrapper.scss';

class RoomGeomWrapper extends PureComponent {
  render() {

    const {beds, timelineStartDate, tripDayWidth, timelineViewType, status} = this.props;

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
        <div className="room-status-bar item-row">
          {status
            ? (
              <div style={{
                background: '#FF5359',
                paddingLeft: '15px',
                width: '100%',
                color: '#FFFFFF',
                fontFamily: 'DIN Pro',
              }}>
                Unavailable
              </div>
            )
            : null
          }
        </div>
        {bedGeoms}
      </div>
    );
  }
}

RoomGeomWrapper.propTypes = {
  beds: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string,
  status: PropTypes.string.isRequired,
};

RoomGeomWrapper.defaultProps = {
  timelineViewType: 'month'
};

export default RoomGeomWrapper;
