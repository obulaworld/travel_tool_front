import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_NOTIFICATIONS,
  ADD_NOTIFICATION
} from '../constants/actionTypes';
import {
  fetchUsersNotificationSuccess,
  fetchUsersNotificationFailure,
  addNotificationSuccess
} from '../actionCreator/notificationsActions';
import NotificationAPI from '../../services/NotificationsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUsersNotificationSync() {
  try {
    const response = yield call(NotificationAPI.getNotifications);
    yield put(fetchUsersNotificationSuccess(response.data.notifications));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUsersNotificationFailure(errorMessage));
  }
}

export function* watchFetchNotifications() {
  yield takeLatest(FETCH_NOTIFICATIONS, fetchUsersNotificationSync);
}

export function* addNotificationSync(action) {
  yield put(addNotificationSuccess(action.notification));
}

export function* watchaddNotification() {
  yield takeLatest(ADD_NOTIFICATION, addNotificationSync);
}
