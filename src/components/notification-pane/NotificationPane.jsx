import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';

import './_notificationPane.scss';

import notifications from '../../mockData/notifications';

const generalNotifications = [];

const pendingNotifications = notifications.filter(notification => {
  if (!notification.isPending) {
    generalNotifications.push(notification);
  }
  return notification.isPending;
});

export default class NotificationPane extends PureComponent {
  render() {
    const { onCloseNotificationPane } = this.props;
    return (
      <div className="nav-pane">
        <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
        <div className="scrollable-div">
          <NotificationContainer
            title="Pending Approvals"
            pendingNotifications={pendingNotifications}
          />
          <NotificationContainer
            title="General Notifications"
            generalNotifications={generalNotifications}
          />
        </div>
      </div>
    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired
};
