import React, {PureComponent} from 'react';
import { PropTypes } from 'prop-types';

class RoomLabel extends PureComponent {
  state = {
    showMarkUnavailable: false
  };

  toggleMarkUnavailable = () => {
    this.setState(prevState => ({
      showMarkUnavailable: !prevState.showMarkUnavailable
    }));
  }

  render() {
    const {showMarkUnavailable} = this.state;
    const {name} = this.props;
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
            <div>CB</div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    );
  }
}

RoomLabel.propTypes = {
  name: PropTypes.string.isRequired
};

export default RoomLabel;
