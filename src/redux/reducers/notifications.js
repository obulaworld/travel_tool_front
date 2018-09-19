const initialState = {
  notifications: []
};
const notifications = (state = [], action) => {
  switch(action.type) {
  case 'FETCH_NOTIFICATIONS_SUCCESS':
    return action.notifications;
  case 'FETCH_NOTIFICATIONS_FAILURE':
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case 'ADD_NOTIFICATION_SUCCESS':
    return [action.notification, ...state];
  case 'ADD_NOTIFICATION_FAILURE':
    return { error: action.error };
  default: return state;
  }
};

export default notifications;
