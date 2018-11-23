import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import MaintainceForm from '../../Forms/MaintainanceForm';
import tick from '../../../images/Tick/tick.svg';
import Modal from '../../modal/Modal';

class RoomLabel extends PureComponent {
  state = {
    showMarkUnavailable: false
  };

  toggleMarkUnavailable = () => {
    this.setState(prevState => ({
      showMarkUnavailable: !prevState.showMarkUnavailable
    }));
  }

  showId = (id, status) =>{
    const {updateRoomState, timelineDateRange, guestHouseId} = this.props;
    const [startDateString, endDateString] = timelineDateRange;
    let data;
    if (status == true){
      data = { fault: false };
      updateRoomState(data, id, startDateString, endDateString, guestHouseId);
    }
    else{
      data = { fault: true };
      updateRoomState(data, id, startDateString, endDateString, guestHouseId);
    }
  }

  renderMainteinanceForm(type){
    const {closeModal, name, id, status,shouldOpen, addmaintenanceRecord, modalType} = this.props;
    return(
      <Modal
        closeModal={closeModal}
        width="480px"
        visibility={shouldOpen && type === modalType ? 'visible' : 'invisible'}
        title={`Mark ${name} Unavailable`}
      >
        <MaintainceForm
          status={status}
          showId={this.showId}
          id={id}
          closeModal={closeModal}
          addmaintenanceRecord={addmaintenanceRecord}
        />
      </Modal>
    );
  }

  renderCheckBox = (statusClass) => {
    const { id, status, openModal, name} = this.props;
    return (
      <div>
        {status ? (
          <div
            role="button"
            tabIndex="0"
            className={`container_room_${statusClass}`}
            onClick={() => this.showId(id, status)}
            onKeyDown={() => this.showId(id, status)}
          />
        ): (
          <div
            role="button"
            tabIndex="0"
            className={`container_room_${statusClass}`}
            onClick={() => openModal(true,  `${name}-${id}`)}
            onKeyDown={() => openModal(true,  `${name}-${id}`)}
          />

        )}
      </div>
    );
  }

  render() {
    const {showMarkUnavailable} = this.state;
    const {name, id, status} = this.props;
    const visibility = showMarkUnavailable ? 'is-visible' : 'is-hidden';
    return (
      <div className="room-name item-row">
        <div>{name}</div>
        <div
          className="ellipsis"
          tabIndex="0"
          role="button"
          onFocus={this.toggleMarkUnavailable}
          onBlur={this.toggleMarkUnavailable}
        >
          &hellip;
          <div className={`mark-unavailable ${visibility}`}>
            {status ? this.renderCheckBox('fault') : this.renderCheckBox('fine')}
            <span>Unavailable</span>
          </div>
        </div>
        {this.renderMainteinanceForm(`${name}-${id}`)}
      </div>
    );
  }
}

RoomLabel.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addmaintenanceRecord: PropTypes.func.isRequired,
  shouldOpen:PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  timelineDateRange: PropTypes.array.isRequired,
  guestHouseId: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  updateRoomState: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RoomLabel;
