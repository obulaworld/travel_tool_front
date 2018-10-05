import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import Timeline from '../../../components/Timeline';
import GuestHouseDetailCard from '../../../components/GuestHouseDetailCard';
import {initFetchTimelineData} from '../../../redux/actionCreator';
import greyBedIcon from '../../../images/icons/accomodation_inactive.svg';
import './FullGuestHouseDetails.scss';
import  updateRoomState  from '../../../redux/actionCreator/roomActionCreator';

class GuestHouseDetails extends PureComponent {
  renderGuestHouseDetailsNameBar = () => {
    const {match, history, guestHouse} = this.props;
    const {params} = match;
    return (
      <div className="guesthouse-details-wrapper--top">
        <div className="details-wrapper-top-right">
          <div
            className="back-button"
            role="presentation"
            onClick={history.goBack}
          >
            <div className="arrow">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="guest-house-name">
            {`${guestHouse.houseName}`}
          </div>
          <div className="bed-count-label">
            <div>
              <img src={greyBedIcon} alt="ic" />
            </div>
            <div>{this.getBedCount(guestHouse.rooms)}</div>
          </div>
        </div>
        <div>
          Edit Guest House
        </div>
      </div>
    );
  }

  fetchTimelineRoomsData = (startDate, endDate) => {
    const {initFetchTimelineData, match} = this.props;
    initFetchTimelineData(match.params.guestHouseId, startDate, endDate);
  }

  getBedCount = (rooms) => {
    return rooms.reduce((currSum, room) => currSum + room.bedCount, 0);
  }

  getAvailableBedsCount = (rooms) => {
    return rooms.reduce((currSum, room) => {
      return room.faulty ? (currSum + 0) : (currSum + room.bedCount);
    }, 0);
  }

  getUnavailableBedCount = (rooms) => {
    const allBeds = this.getBedCount(rooms);
    const availableBeds = this.getAvailableBedsCount(rooms);
    return allBeds - availableBeds;
  }

  render() {
    const { guestHouse, updateRoomState } = this.props;
    return (
      <div className="guesthouse-details-wrapper">
        <div>
          {this.renderGuestHouseDetailsNameBar()}
          <div className="guesthouse-details-wrapper--key-details">
            <GuestHouseDetailCard
              label="Available spaces"
              value={this.getAvailableBedsCount(guestHouse.rooms)}
            />
            <GuestHouseDetailCard
              label="No. of rooms"
              value={guestHouse.rooms.length}
            />
            <GuestHouseDetailCard
              label="Vacant spaces"
              value={4}
            />
            <GuestHouseDetailCard
              label="Unavailable"
              value={this.getUnavailableBedCount(guestHouse.rooms)}
            />
          </div>
        </div>
        <Timeline
          rooms={guestHouse.rooms}
          guestHouseId={guestHouse.id}
          fetchTimelineRoomsData={this.fetchTimelineRoomsData}
          updateRoomState={updateRoomState}
        />
      </div>
    );
  }
}

GuestHouseDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  initFetchTimelineData: PropTypes.func,
  guestHouse: PropTypes.object.isRequired,
  updateRoomState: PropTypes.func.isRequired,
};

GuestHouseDetails.defaultProps = {
  initFetchTimelineData: ()=>{}
};

const mapStateToProps = (state) => ({
  guestHouse: state.accommodation.guestHouse
});

const actionCreators = {
  initFetchTimelineData,
  updateRoomState
};

export default connect(mapStateToProps, actionCreators)(GuestHouseDetails);
