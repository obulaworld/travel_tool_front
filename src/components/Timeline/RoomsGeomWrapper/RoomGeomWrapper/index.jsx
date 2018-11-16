import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import BedGeomWrapper from '../BedGeomWrapper';
import TimelineBarWrapper from '../TimelineBarWrapper';
import TimelineBar from '../TimelineBarWrapper/TimelineBar';
import TimelineBarHelper from '../TimelineBarHelper';
import './RoomGeomWrapper.scss';

class RoomGeomWrapper extends PureComponent {
  renderMaintananceBar = (tripStats) => {
    const {tripDayWidth} = this.props;
    return (
      <TimelineBar
        tripDayWidth={tripDayWidth}
        tripStats={tripStats}
        customStyle={{
          background: '#FF5359',
        }}
      >
        <div className="maintainance-bar inner">
          Unavailable
        </div>
      </TimelineBar>
    );
  }
  render() {

    const {beds, timelineStartDate, tripDayWidth,timelineViewType, status, handleChangeRoomModal, maintainances} = this.props;

    const bedGeoms = beds.map(bed => (
      <BedGeomWrapper
        key={bed.id}
        trips={bed.trips}
        timelineStartDate={timelineStartDate}
        tripDayWidth={tripDayWidth}
        timelineViewType={timelineViewType}
        handleChangeRoomModal={handleChangeRoomModal}
      />
    ));
    const maintainanceBars = maintainances.map(maintainance => {
      maintainance.departureDate = maintainance.start;
      maintainance.returnDate = maintainance.end;
      const helper = new TimelineBarHelper(this.props);
      const tripStats = helper.getTripStats(maintainance);
      return (
        <TimelineBarWrapper
          toggleBookingDetails={()=>{}}
          setBookingDetailsAbsolutePos={()=>{}}
          tripStats={tripStats}
          key={maintainance.id}
        >
          {this.renderMaintananceBar(tripStats)}
        </TimelineBarWrapper>
      );
    });
    return (
      <div className="room-geometry-wrapper">
        <div className="room-status-bar item-row">
          {maintainanceBars}
        </div>
        {bedGeoms}
      </div>
    );
  }
}

RoomGeomWrapper.propTypes = {
  maintainances: PropTypes.array.isRequired,
  beds: PropTypes.array.isRequired,
  timelineStartDate: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  timelineViewType: PropTypes.string,
  status: PropTypes.string.isRequired,
  handleChangeRoomModal: PropTypes.func.isRequired
};

RoomGeomWrapper.defaultProps = {
  timelineViewType: 'month'
};

export default RoomGeomWrapper;
