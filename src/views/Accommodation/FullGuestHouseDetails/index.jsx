import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Timeline from '../../../components/Timeline';
import GuestHouseDetailCard from '../../../components/GuestHouseDetailCard';
import { initFetchTimelineData } from '../../../redux/actionCreator';
import {
  editAccommodation,
  fetchAccommodation,
  disableAccommodation
} from '../../../redux/actionCreator/accommodationActions';
import greyBedIcon from '../../../images/icons/accomodation_inactive.svg';
import Modal from '../../../components/modal/Modal';
import { NewAccommodationForm } from '../../../components/Forms';
import  MaintainceForm  from '../../../components/Forms/MaintainanceForm';
import addmaintenanceRecord, 
{ deleteMaintenanceRecord, updateMaintenanceRecord } from '../../../redux/actionCreator/maintenanceAction';
import {
  openModal,
  closeModal
} from '../../../redux/actionCreator/modalActions';
import edit_icon from '../../../images/icons/edit_icon.svg';
import disable_icon from '../../../images/icons/disabled.svg';
import './FullGuestHouseDetails.scss';
import updateRoomState from '../../../redux/actionCreator/roomActionCreator';
import { updateTripRoom } from '../../../redux/actionCreator/tripActions';
import { fetchAvailableRooms } from '../../../redux/actionCreator/availableRoomsActions';
import Preloader from '../../../components/Preloader/Preloader';

export class GuestHouseDetails extends PureComponent {
  handleOnEdit = () => {
    let { openModal } = this.props;
    openModal(true, 'edit accommodation');
  };

  handleOnDisable = () => {
    let { openModal } = this.props;
    openModal(true, 'disable guesthouse');
  }

  disableGuestHouse = () => {
    const { disableAccommodation, guestHouse, history } = this.props;
    const { id } = guestHouse;
    disableAccommodation(id);
    history.push('/residence/manage');
  }

  renderGuestHouseDetailsNameBar = () => {
    const { match, history, guestHouse, userId } = this.props;
    return (
      <div className="guesthouse-details-wrapper--top">
        <div className="details-wrapper-top-right">
          <div 
            className="back-button" role="presentation" onClick={history.goBack}
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
        <div className="guest-house-action-div">
          <div>
            <img src={edit_icon} alt="Edit Link" className="edit-icon" />
            <button
              type="button" className="edit-btn" onClick={this.handleOnEdit}
            >
              Edit Guest House
            </button>
          </div>
          <div>
            <img src={disable_icon} alt="Edit Link" className="edit-icon" />
            <button 
              id="handleOnDisableId" type="button" className="edit-btn" onClick={this.handleOnDisable}
            >
              Disable Guest House
            </button>
          </div>
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
    if (rooms.length !== 0) {
      const room = (rooms.map(room => room.faulty? [] : room.beds));
      return room.map(bed => bed? bed.filter(b => !b.booked): []).reduce((acc, val) => acc+val.length, 0);
    }
    return 0;
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
    updateTripRoom({ tripId, data });
  }

  renderDisableAccommodationModal() {
    const { closeModal, modal, guestHouse } = this.props;
    const { shouldOpen, modalType } = modal;
    return (
      <Modal
        closeModal={closeModal} customModalStyles="delete-checklist-item restore-model-content"
        visibility={shouldOpen && modalType.match('disable guesthouse') ? 'visible' : 'invisible'}
        title={`Disable ${guestHouse.houseName}`}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to disable
          <strong>{guestHouse.houseName}</strong>
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button type="button" className="delete-checklist-item__footer--cancel" onClick={closeModal}>Cancel</button>
          <button id="disableGuestHouseId" type="button" className="restore-checklist-items__footer--delete" onClick={this.disableGuestHouse}>
            Disable
          </button>
        </div>
      </Modal>
    );
  }


  renderEditAccommodationForm() {
    const { 
      closeModal, modal, guestHouse, initFetchTimelineData, fetchAccommodation, editAccommodation, editingAccommodation,
    } = this.props;
    const { shouldOpen, modalType } = modal;
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={shouldOpen && modalType === 'edit accommodation' ? 'visible' : 'invisible'}
        title={`Edit ${guestHouse.houseName}`}
      >
        <NewAccommodationForm
          closeModal={closeModal} modalType={modalType} fetchAccommodation={fetchAccommodation}
          editAccommodation={editAccommodation} editingAccommodation={editingAccommodation}
          guestHouse={guestHouse} initFetchTimelineData={initFetchTimelineData}
        />
      </Modal>
    );
  }

  render() {
    const { guestHouse, updateRoomState, availableBeds,fetchAvailableRooms, loadingBeds, maintenance, openModal,closeModal, 
      modal, loading, isLoading, addmaintenanceRecord, deleteMaintenanceRecord, updateMaintenanceRecord, maintenanceDetails 
    } = this.props;
    const { shouldOpen, modalType } = modal;
    return (
      <div className="guesthouse-details-wrapper">
        {this.renderEditAccommodationForm()}
        {this.renderDisableAccommodationModal()}
        <div className="set-details">
          { isLoading ? (
            <Preloader />
          ) : (
            <Fragment>
              {this.renderGuestHouseDetailsNameBar()}
              <div className="guesthouse-details-wrapper--key-details">
                <GuestHouseDetailCard
                  label="Bed Capacity" value={this.getBedCount(guestHouse.rooms)}
                />
                <GuestHouseDetailCard
                  label="No. of rooms" value={guestHouse.rooms.length}
                />
                <GuestHouseDetailCard
                  label="Vacant spaces" value={this.getAvailableBedsCount(guestHouse.rooms)} />
                <GuestHouseDetailCard
                  label="Unavailable" value={this.getUnavailableBedCount(guestHouse.rooms)}
                />
              </div>
            </Fragment>
          )}
        </div>
        <Timeline
          modalType={modalType} shouldOpen={shouldOpen} openModal={openModal}
          modal={modal} closeModal={closeModal} handleMaintainence={this.handleMaintainence}
          rooms={guestHouse.rooms} guestHouseId={guestHouse.id} fetchTimelineRoomsData={this.fetchTimelineRoomsData}
          updateRoomState={updateRoomState} addmaintenanceRecord={addmaintenanceRecord}
          deleteMaintenanceRecord={deleteMaintenanceRecord} updateTripRoom={this.callUpdateTripRoom}
          availableBeds={availableBeds} fetchAvailableRooms={fetchAvailableRooms}
          loadingBeds={loadingBeds} loading={loading} editMaintenance={maintenance}
          updateMaintenanceRecord={updateMaintenanceRecord} maintenanceDetails={maintenanceDetails}
        />
      </div>
    );
  }
}

GuestHouseDetails.propTypes = {
  maintenance: PropTypes.object, guestHouse: PropTypes.object,
  match: PropTypes.object.isRequired, history: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired, closeModal: PropTypes.func.isRequired,
  initFetchTimelineData: PropTypes.func,
  updateRoomState: PropTypes.func.isRequired,
  addmaintenanceRecord:PropTypes.func.isRequired,
  deleteMaintenanceRecord:PropTypes.func.isRequired,
  updateMaintenanceRecord:PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired, modal: PropTypes.func.isRequired,
  fetchAccommodation: PropTypes.func.isRequired, editAccommodation: PropTypes.func.isRequired,
  editingAccommodation: PropTypes.bool.isRequired,
  updateTripRoom: PropTypes.func.isRequired, availableBeds: PropTypes.array.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired, loadingBeds: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired, isLoading: PropTypes.bool.isRequired,
  maintenanceDetails: PropTypes.object, disableAccommodation: PropTypes.func.isRequired,
};

GuestHouseDetails.defaultProps = {
  initFetchTimelineData: () => { },
  guestHouse: {},
  maintenance: {},
  maintenanceDetails: {},
};

const mapStateToProps = (state) => ({
  guestHouse: state.accommodation.guestHouse,
  isLoading: state.accommodation.isLoading,
  user: state.auth.user.UserInfo,
  modal: state.modal.modal,
  availableBeds: state.availableRooms.beds,
  loadingBeds: state.availableRooms.isLoading,
  loading: state.trips.loading,
  editingAccommodation: state.accommodation.editingAccommodation,
  maintenance: state.maintenance,
  maintenanceDetails: state.maintenance
});

const actionCreators = {
  initFetchTimelineData, updateRoomState,
  openModal, closeModal, editAccommodation,
  fetchAccommodation, addmaintenanceRecord,
  deleteMaintenanceRecord, updateTripRoom,
  fetchAvailableRooms, updateMaintenanceRecord, disableAccommodation
};

export default connect(mapStateToProps, actionCreators)(GuestHouseDetails);
