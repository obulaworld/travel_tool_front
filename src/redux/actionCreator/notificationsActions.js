import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE
} from '../constants/actionTypes';

export const fetchUsersNotification = () => ({
  type: FETCH_NOTIFICATIONS
});
export const fetchUsersNotificationSuccess = notifications => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications
});
export const fetchUsersNotificationFailure = error => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  error
});

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification
});
export const addNotificationSuccess = notification => ({
  type: ADD_NOTIFICATION_SUCCESS,
  notification
});
export const addNotificationFailure = error => ({
  type: ADD_NOTIFICATION_FAILURE,
  error
});
