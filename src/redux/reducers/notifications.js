import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS
} from '../constants/actionTypes';
import { updateNotificationsStatus } from '../../helper/notifications-helper';

export const initialState = {
  isLoading: false,
  notifications: [],
  error: null
};

const notifications = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_NOTIFICATIONS_SUCCESS:
    return { ...state,
      notifications: action.notifications,
      isLoading: false,
      error: null
    };
  case FETCH_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      error: true
    };
  case ADD_NOTIFICATION_SUCCESS:
    return {
      ...state,
      notifications: [ action.notification, ...state.notifications ]
    };
  case ADD_NOTIFICATION_FAILURE:
    return { ...state, error: action.error };
  case UPDATE_ALL_NOTIFICATIONS_STATUS:
    return { ...state, isLoading: true };
  case UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      notifications: updateNotificationsStatus(state, action.message)
    };
  case UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE:
    return { ...state, isLoading: false, error: action.error };
  default: return state;
  }
};

export default notifications;
