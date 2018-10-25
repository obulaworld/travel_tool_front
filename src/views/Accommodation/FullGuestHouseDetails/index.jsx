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
import edit_icon from '../../../images/icons/edit_icon.svg';
import './FullGuestHouseDetails.scss';
import updateRoomState from '../../../redux/actionCreator/roomActionCreator';
import { updateTripRoom } from '../../../redux/actionCreator/tripActions';
import { fetchAvailableRooms } from '../../../redux/actionCreator/availableRoomsActions';

export class GuestHouseDetails extends PureComponent {
  handleOnEdit = () => {
    let { openModal } = this.props;
    openModal(true, 'edit accommodation');
  };

  renderGuestHouseDetailsNameBar = () => {
    const { match, history, guestHouse } = this.props;

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
        <div>
          <img src={edit_icon} alt="Edit Link" className="edit-icon" />
          <button
            type="button"
            className="edit-btn"
            onClick={this.handleOnEdit}
          >
              Edit Guest House
          </button>
        </div>
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

  callUpdateTripRoom = (tripId, bedId, reason, startDate, endDate) => {
    const { updateTripRoom, match } = this.props;
    const data = {
      bedId,
      reason,
      guestHouseId: match.params.guestHouseId,
      startDate,
      endDate
    };
    updateTripRoom({tripId, data});
  }

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
          shouldOpen && modalType === 'edit accommodation'
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
    const { guestHouse, updateRoomState, availableBeds,
      fetchAvailableRooms, loadingBeds, openModal,
      closeModal, modal, loading } = this.props;
    const { shouldOpen, modalType } = modal;
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
          updateTripRoom={this.callUpdateTripRoom}
          availableBeds={availableBeds}
          fetchAvailableRooms={fetchAvailableRooms}
          loadingBeds={loadingBeds}
          openModal={openModal}
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          loading={loading}
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
  guestHouse: PropTypes.object,
  updateRoomState: PropTypes.func.isRequired,
  modal: PropTypes.func.isRequired,
  fetchAccommodation: PropTypes.func.isRequired,
  editAccommodation: PropTypes.func.isRequired,
  updateTripRoom: PropTypes.func.isRequired,
  availableBeds: PropTypes.array.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  loadingBeds: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

GuestHouseDetails.defaultProps = {
  initFetchTimelineData: () => {},
  guestHouse: {},
};

const mapStateToProps = (state) => ({
  guestHouse: state.accommodation.guestHouse,
  user: state.auth.user.UserInfo,
  modal: state.modal.modal,
  availableBeds: state.availableRooms.beds,
  loadingBeds: state.availableRooms.isLoading,
  loading: state.trips.loading
});

const actionCreators = {
  initFetchTimelineData,
  updateRoomState,
  openModal,
  closeModal,
  editAccommodation,
  fetchAccommodation,
  updateTripRoom,
  fetchAvailableRooms,
};

export default connect(
  mapStateToProps,
  actionCreators
)(GuestHouseDetails);
