import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_notificationContainer.scss';
import NotificationItem from './NotificationItem';

export default class NotificationContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMarkAllAsRead = this.handleMarkAllAsRead.bind(this);
    this.getUnreadNotificationsCount = this.getUnreadNotificationsCount.bind(this);
  }

  getUnreadNotificationsCount() {
    const { title, generalNotifications, pendingNotifications } = this.props;
    const notificationStatus =
      (title === 'Pending Approvals')
        ? pendingNotifications
          .map(notification => notification.notificationStatus)
        : generalNotifications
          .map(notification => notification.notificationStatus);
    const unreadNotifications =
      notificationStatus.filter(status => status === 'unread');
    const notificationsCount = unreadNotifications.length;
    return notificationsCount;
  }

  handleMarkAllAsRead() {
    const { title, updateAllNotificationStatus } = this.props;
    const currentStatus = 'unread';
    const newStatus = 'read';
    const notificationType = (title === 'Pending Approvals')
      ? 'pending'
      : 'general';

    return updateAllNotificationStatus(
      currentStatus,
      newStatus,
      notificationType
    );
  }

  renderNotifications = (notifications) => {
    return notifications.length && notifications.map(
      notification => {
        let isPending = false;
        let general = false;
        if(notification.notificationType === 'pending'){
          isPending = true;
        }
        if(notification.message === 'approved your request' || notification.message === 'posted a comment'){
          general = true;
        }
        const{ handleClick } = this.props;
        return  (
          <NotificationItem
            handleClick={handleClick}
            link={notification.notificationLink}
            key={notification.id}
            isPending={isPending}
            general={general}
            name={notification.senderName}
            notificationStatus={notification.notificationStatus}
            image={notification.senderImage}
            timeStamp={notification.updatedAt}
            message={notification.message}
          />
        );
      }
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
              {this.getUnreadNotificationsCount()}
            </div>
          </div>
          <div
            role="button"
            className="notification-container__header__action"
            onClick={this.handleMarkAllAsRead}
            onKeyUp={this.handleMarkAllAsRead}
            tabIndex={0}
          >
              mark all as read
          </div>
        </div>
        {title === 'Pending Approvals' && number !== 0 && this.renderNotifications(pendingNotifications)}
        {title === 'General Notifications' && number !== 0 && this.renderNotifications(generalNotifications)}
      </div>
    );
  }
}

const NOTIFICATIONS_PROPTYPES = PropTypes.arrayOf(PropTypes.shape({
  isPending: PropTypes.bool,
  name: PropTypes.string,
  notificationStatus: PropTypes.string,
  requestId: PropTypes.string,
  senderImage: PropTypes.string.isRequired,
}));

NotificationContainer.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  updateAllNotificationStatus: PropTypes.func.isRequired,
  pendingNotifications: NOTIFICATIONS_PROPTYPES,
  generalNotifications: NOTIFICATIONS_PROPTYPES,
};

NotificationContainer.defaultProps = {
  pendingNotifications: [],
  generalNotifications: [],
  handleClick: ()=>{}
};



