import { put, takeLatest, call } from 'redux-saga/effects';
import NotificationsAPI from '../../services/NotificationsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { fetchNotificationsSuccess, fetchNotificationsFailure, addNotificationSuccess } from '../actionCreator/notificationsActions';

export function* fetchNotifications(action) {
  try {
    const response = yield call(NotificationsAPI.getNotifications);
    yield put(fetchNotificationsSuccess(response.data.notifications));

  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchNotificationsFailure(errorMessage));
  }
}

export function* watchFetchNotifications() {
  yield takeLatest('FETCH_NOTIFICATIONS', fetchNotifications);
}

export function* addNotification(action) {
  try {
    yield put(addNotificationSuccess(action.notification));
  } catch (error) {
    yield put({
      type: 'ADD_NOTIFICATION_FAILURE',
      error
    });
  }
}

export function* watchAddNotifications() {
  yield takeLatest('ADD_NOTIFICATION', addNotification);
}
