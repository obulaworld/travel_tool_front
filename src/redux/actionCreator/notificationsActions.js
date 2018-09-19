import {
} from '../constants/actionTypes';

export const fetchNotifications = () => ({
  type: 'FETCH_NOTIFICATIONS',
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: 'FETCH_NOTIFICATIONS_SUCCESS',
  notifications
});

export const fetchNotificationsFailure = error => ({
  type: 'FETCH_NOTIFICATIONS_FAILURE',
  error
});

export const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    notification
  };
};

export const addNotificationSuccess = (notification) => {
  return {
    type: 'ADD_NOTIFICATION_SUCCESS',
    notification
  };
};
