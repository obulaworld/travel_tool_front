import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  notifications: [],
  error: null
};
const notifications = (state = initialState, action) => {
  switch(action.type) {
  case 'FETCH_NOTIFICATIONS_SUCCESS':
    return { ...state,
      notifications: action.notifications,
      isLoading: false,
      error: null
    };
  case 'FETCH_NOTIFICATIONS_FAILURE':
    return {
      error: true
    };
  case 'ADD_NOTIFICATION_SUCCESS':
    return {
      ...state,
      notifications: [ action.notification, ...state.notifications ]
    };
  case 'ADD_NOTIFICATION_FAILURE':
    return { ...state, error: action.error };
  default: return state;
  }
};
export default notifications;
