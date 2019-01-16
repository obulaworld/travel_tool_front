import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS_FAILURE
} from '../constants/actionTypes';

import {
  fetchEmailReminderSuccess,
  fetchEmailReminderFailure
} from '../actionCreator/emailReminderAction';

import emailReminderAPI from '../../services/emailReminderAPI';
import apiErrorHandler from '../../services/apiErrorHandler';


export function* fetchEmailRemindersAsync(action) {
  try {
    const { query } = action;
    const response = yield call(emailReminderAPI.getEmailReminders, query);
    const { reminders, meta } = response.data;
    yield put(fetchEmailReminderSuccess({reminders, meta}));
  }catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchEmailReminderFailure(errorMessage));
  }
}

export function* watchfetchEmailReminders() {
  yield takeLatest(FETCH_EMAIL_REMINDERS, fetchEmailRemindersAsync);
}
