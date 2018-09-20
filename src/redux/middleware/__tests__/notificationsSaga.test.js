import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  watchFetchNotifications,
  watchaddNotification
} from '../notificationsSaga';
import NotificationsAPI from '../../../services/NotificationsAPI';

const response = {
  data: {
    notifications: []
  }
};
const error = 'Possible network error, please reload the page';

describe('Notifications Saga', () => {
  describe('Fetch notification saga', () => {
    it('fetches users notification', () => {
      return expectSaga(watchFetchNotifications, NotificationsAPI)
        .provide([[call(NotificationsAPI.getNotifications), response]])
        .put({
          type: 'FETCH_NOTIFICATIONS_SUCCESS',
          notifications: response.data.notifications
        })
        .dispatch({
          type: 'FETCH_NOTIFICATIONS'
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s notifications', () => {
      return expectSaga(watchFetchNotifications, NotificationsAPI)
        .provide([[call(NotificationsAPI.getNotifications), throwError(error)]])
        .put({
          type: 'FETCH_NOTIFICATIONS_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_NOTIFICATIONS'
        })
        .run();
    });
  });
  describe('Add notification saga', () => {
    it('Add notification', () => {
      return expectSaga(watchaddNotification)
        .put({
          type: 'ADD_NOTIFICATION_SUCCESS',
          notification: response.data.notifications
        })
        .dispatch({
          type: 'ADD_NOTIFICATION',
          notification: response.data.notifications
        })
        .run();
    });
  });
});
