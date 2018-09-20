import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotificationHeader from './NotificationHeader';
import NotificationContainer from './NotificationContainer';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import './_notificationPane.scss';
import handleManagerNotification from '../../helper/socket/socket';
import {fetchUsersNotification} from '../../redux/actionCreator/notificationsActions';

export class NotificationPane extends PureComponent {

  componentDidMount() {
    const { user, fetchUsersNotification } = this.props;
    fetchUsersNotification(); 
    handleManagerNotification(user && user.UserInfo.id);
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
      <Fragment>
        <div className="nav-pane">
          <NotificationHeader onCloseNotificationPane={onCloseNotificationPane} />
          <div className="scrollable-div">
            <NotificationContainer
              title="Pending Approvals"
              pendingNotifications={notifications.pendingNotifications}
            />
            <NotificationContainer
              title="General Notifications"
              generalNotifications={notifications.generalNotifications}
            />
          </div>
          <div className="notification-item__last" />
        </div>
      </Fragment>
    );
  }
}

NotificationPane.propTypes = {
  onCloseNotificationPane: PropTypes.func.isRequired,
  fetchUsersNotification: PropTypes.func.isRequired,
  user: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object)
};

NotificationPane.defaultProps = {
  notifications: [],
  user: {
    UserInfo: {
      id: ''
    }
  }
};

const mapStateToProps = ({auth, notifications, modal}) => ({
  user: auth.user,
  notifications,
  ...modal.modal
});

const mapDispatchToProps = {
  fetchUsersNotification,
  openModal,
  closeModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationPane);
