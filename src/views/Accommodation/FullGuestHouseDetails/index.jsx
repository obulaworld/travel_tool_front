import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Timeline from '../../../components/Timeline';
import GuestHouseDetailCard from '../../../components/GuestHouseDetailCard';
import { initFetchTimelineData } from '../../../redux/actionCreator';
import {
  editAccommodation,
  fetchAccommodation
} from '../../../redux/actionCreator/accommodationActions';
import greyBedIcon from '../../../images/icons/accomodation_inactive.svg';
import Modal from '../../../components/modal/Modal';
import { NewAccommodationForm } from '../../../components/Forms';
import {
  openModal,
  closeModal
} from '../../../redux/actionCreator/modalActions';
import './FullGuestHouseDetails.scss';
import updateRoomState from '../../../redux/actionCreator/roomActionCreator';

export class GuestHouseDetails extends PureComponent {
  handleOnEdit = () => {
    let { openModal } = this.props;
    openModal(true, 'edit accomodation');
  };

  renderGuestHouseDetailsNameBar = () => {
    const { match, history, guestHouse, userId } = this.props;

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
          <div className="guest-house-name">{`${guestHouse.houseName}`}</div>
          <div className="bed-count-label">
            <div>
              <img src={greyBedIcon} alt="ic" />
            </div>
            <div>{this.getBedCount(guestHouse.rooms)}</div>
          </div>
        </div>
        {userId === guestHouse.userId ? (
          <div>
            <button
              type="button"
              className="edit-btn"
              onClick={this.handleOnEdit}
            >
              Edit Guest House
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  fetchTimelineRoomsData = (startDate, endDate) => {
    const { initFetchTimelineData, match } = this.props;
    initFetchTimelineData(match.params.guestHouseId, startDate, endDate);
  };

  getBedCount = rooms => {
    return rooms.reduce((currSum, room) => currSum + room.bedCount, 0);
  };

  getAvailableBedsCount = rooms => {
    return rooms.reduce((currSum, room) => {
      return room.faulty ? currSum : (currSum + room.bedCount);
    }, 0);
  };

  getUnavailableBedCount = rooms => {
    const allBeds = this.getBedCount(rooms);
    const availableBeds = this.getAvailableBedsCount(rooms);
    return allBeds - availableBeds;
  };

  renderEditAccommodationForm() {
    const {
      closeModal,
      modal,
      guestHouse,
      initFetchTimelineData,
      fetchAccommodation,
      editAccommodation
    } = this.props;
    const { shouldOpen, modalType } = modal;
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={
          shouldOpen && modalType === 'edit accomodation'
            ? 'visible'
            : 'invisible'
        }
        title={`Edit ${guestHouse.houseName}`}
      >
        <NewAccommodationForm
          closeModal={closeModal}
          modalType={modalType}
          fetchAccommodation={fetchAccommodation}
          editAccommodation={editAccommodation}
          guestHouse={guestHouse}
          initFetchTimelineData={initFetchTimelineData}
        />
      </Modal>
    );
  }

  render() {
    const { guestHouse, updateRoomState } = this.props;
    return (
      <div className="guesthouse-details-wrapper">
        {this.renderEditAccommodationForm()}
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
            <GuestHouseDetailCard label="Vacant spaces" value={4} />
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
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  initFetchTimelineData: PropTypes.func,
  // guestHouse: PropTypes.object.isRequired,
  guestHouse: PropTypes.object,
  updateRoomState: PropTypes.func.isRequired,
  userId: PropTypes.string,
  modal: PropTypes.func.isRequired,
  fetchAccommodation: PropTypes.func.isRequired,
  editAccommodation: PropTypes.func.isRequired
};

GuestHouseDetails.defaultProps = {
  initFetchTimelineData: () => {},
  userId: '',
  guestHouse: {},
};

const mapStateToProps = state => ({
  guestHouse: state.accommodation.guestHouse,
  user: state.auth.user.UserInfo,
  modal: state.modal.modal,
  userId: state.auth.user.UserInfo.id
});

const actionCreators = {
  initFetchTimelineData,
  updateRoomState,
  openModal,
  closeModal,
  editAccommodation,
  fetchAccommodation
};

export default connect(
  mapStateToProps,
  actionCreators
)(GuestHouseDetails);
