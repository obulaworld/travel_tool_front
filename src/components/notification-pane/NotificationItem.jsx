import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_notificationItem.scss';
import readMessageIcon from '../../images/read-message.svg';
import unreadMessageIcon from '../../images/unread-message.svg';

export default class NotificationItem extends PureComponent {
  renderNotificationItemMetaInfo = () => {
    const { isPending, notificationStatus } = this.props;
    return (
      <div className="notification--item__info__bottom">
        <span className="t-hours-ago">
          5 hours ago
        </span>
        <span className="view-details" role="button" tabIndex="0" onKeyUp={()=>{}}>
          {isPending && 'View Details'}
        </span>
        <img
          role="presentation"
          src={notificationStatus === 'read' ? readMessageIcon : unreadMessageIcon}
          alt="message icon"
          className={notificationStatus === 'read' ? 'msg-icon msg-icon__opened' : 'msg-icon msg-icon__closed'}
        />
      </div>
    );
  };

  render() {
    const { name, image, notificationStatus } = this.props;
    const bgColorClass = notificationStatus === 'read' ? 'message-opened' : '';

    return (
      <div className={`notification-item ${bgColorClass}`}>
        <div className="notification-item__image__container">
          <img src={image} alt="" className="notification-item__image" />
        </div>
        <div className="notification-item__info">
          <div className="notification--item__info__top">
            <div>
              <span className="notification--item__info__top__name">
                {`@${name} `}
              </span>
              submitted a travel request for your approval
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
  notificationStatus: 'unread',
  name: '',
  image: '',
};

NotificationItem.propTypes = {
  isPending: PropTypes.bool,
  name: PropTypes.string,
  notificationStatus: PropTypes.string,
  image: PropTypes.string,
};
