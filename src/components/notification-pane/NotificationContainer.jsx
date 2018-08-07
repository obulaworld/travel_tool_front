import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_notificationContainer.scss';
import image from '../../images/logo.svg';
import NotificationItem from './NotificationItem';

export default class NotificationContainer extends PureComponent {

  renderNotifications = (notifications) => {
    return notifications.map(
      notification => (
        <NotificationItem
          key={notification.name}
          isPending={notification.isPending}
          name={notification.name}
          messageOpened={notification.messageOpened}
          image={image}
        />
      )    
    );
  };

  render() {
    const { title, pendingNotifications, generalNotifications } = this.props;
    const customClass = title === 'Pending Approvals' ? 'pending' : 'general';
    const number = title === 'Pending Approvals'
    ? pendingNotifications.length
    : generalNotifications.length;

    return (
      <div className="notification-container">
        <div className={`notification-container__header--${customClass}`}>
          <div className="notification-container__header__title">
            {title}
            <div className={`notification-container__header__title__number--${customClass}`}>
              {number}
            </div>
          </div>
          <div className="notification-container__header__action">
              mark all as read
          </div>
        </div>
        {title === 'Pending Approvals' && this.renderNotifications(pendingNotifications)}
        {title === 'General Notifications' && this.renderNotifications(generalNotifications)}
      </div>
    );
  }
}

const NOTIFICATIONS_PROPTYPES = PropTypes.arrayOf(PropTypes.shape({
  isPending: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  messageOpened: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
}));

NotificationContainer.propTypes = {
  title: PropTypes.string.isRequired,
  pendingNotifications: NOTIFICATIONS_PROPTYPES,
  generalNotifications: NOTIFICATIONS_PROPTYPES
};

NotificationContainer.defaultProps = {
  pendingNotifications: [],
  generalNotifications: []
};
