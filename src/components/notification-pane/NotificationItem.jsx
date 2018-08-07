import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_notificationItem.scss';
import readMessageIcon from '../../images/read-message.svg';
import unreadMessageIcon from '../../images/unread-message.svg';

export default class NotificationItem extends PureComponent {
  renderNotificationItemMetaInfo = () => {
    const { isPending, messageOpened } = this.props;
    return (
      <div className="notification--item__info__bottom">
        <span className="t-hours-ago">
          5 hours ago
        </span>
        <span className="view-details">
          {isPending && 'View Details'}
        </span>
        <img
          src={messageOpened ? readMessageIcon : unreadMessageIcon}
          alt="message icon"
          className="msg-icon"
        /> 
      </div>
    );
  };

  render() {
    const { isPending, name, image } = this.props;
    const customClass = isPending ? 'general' : '';

    return (
      <div className={`notification-item ${customClass}`}>
        <div className="notification-item__image__container">
          <img src={image} alt="" className="notification-item__image" />
        </div>
        <div className="notification-item__info">
          <div className="notification--item__info__top">
            <div>
              <span className="notification--item__info__top__name">
                {`@${name} `}
              </span>
              submmitted a travel request for your approval
            </div>
          </div>
          {this.renderNotificationItemMetaInfo()}
        </div>
      </div>
    );
  }
}

NotificationItem.defaultProps = {
  isPending: false,
  messageOpened: false,
};

NotificationItem.propTypes = {
  isPending: PropTypes.bool,
  name: PropTypes.string.isRequired,
  messageOpened: PropTypes.bool,
  image: PropTypes.string.isRequired,
};
