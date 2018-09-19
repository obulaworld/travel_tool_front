import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';

import './_notificationPane.scss';

import handleNotification from '../../helper/socket/socket';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchNotifications } from '../../redux/actionCreator/notificationsActions';


export class NotificationPane extends PureComponent {
  componentDidMount() {
    const { user, fetchNotifications } = this.props;
    handleNotification(user && user.UserInfo.id);
    fetchNotifications();
  }

  getNotifications() {
    const { notifications } = this.props;
    const generalNotifications = [];
    const pendingNotifications = [];
    notifications.length && notifications.map(notification => {
      if (notification.notificationType === 'general') {
        generalNotifications.push(notification);
      } else if(notification.notificationType === 'pending') {
        pendingNotifications.push(notification);
      }
    });
    return { generalNotifications, pendingNotifications };
  }

  render() {
    const { onCloseNotificationPane } = this.props;
    const notifications = this.getNotifications();
    return (
      <div className="nav-pane">
        <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
        <div className="scrollable-div">
          <NotificationContainer
            title="Pending Approvals"
            pendingNotifications={notifications && notifications.pendingNotifications}
          />
          <NotificationContainer
            title="General Notifications"
            generalNotifications={notifications && notifications.generalNotifications}
          />
        </div>
        <div className="notification-item__last" />
      </div>
    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  fetchNotifications: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NotificationPane.defaultProps = {
  notifications: [],
  user: {
    UserInfo: {
      id: ''
    }
  }
};

const mapStateToProps = ({ auth, notifications, modal }) => ({
  user: auth.user,
  notifications,
  ...modal.modal
});

const actions = {
  fetchNotifications,
  openModal,
  closeModal
};

export default connect(mapStateToProps, actions)(NotificationPane);
