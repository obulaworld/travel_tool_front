import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import tick from '../../../images/Tick/tick.svg';


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

  renderCheckBox = (statusClass) => {
    const { id, status} = this.props;
    return (
      <div
        role="button"
        tabIndex="0"
        className={`container_room_${statusClass}`}
        onClick={()=> this.showId(id, status)}
        onKeyDown={() => this.showId(id, status)}
      />
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
      </div>
    );
  }
}

RoomLabel.propTypes = {
  status: PropTypes.string.isRequired,
  timelineDateRange: PropTypes.array.isRequired,
  guestHouseId: PropTypes.string.isRequired,
  updateRoomState: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RoomLabel;
