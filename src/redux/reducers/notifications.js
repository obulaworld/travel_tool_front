import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE
} from '../constants/actionTypes';

const notifications = (state = [], action) => {
  switch (action.type) {
  case ADD_NOTIFICATION_SUCCESS:
    return [action.notification, ...state];
  case ADD_NOTIFICATION_FAILURE:
    return {
      error: true
    };
  case FETCH_NOTIFICATIONS_SUCCESS:
    return action.notifications;
  case FETCH_NOTIFICATIONS_FAILURE:
    return {
      error: true
    };
  default:
    return state;
  }
};
export default notifications;
