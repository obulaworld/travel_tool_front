/* eslint-disable import/prefer-default-export */
import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { createReminderSuccess, createReminderFailure } from '../actionCreator/reminderActions';
import apiErrorHandler from '../../services/apiErrorHandler';
import { CREATE_REMINDER } from '../constants/actionTypes';
import ReminderAPI from '../../services/ReminderAPI';
import apiValidationErrorHandler from '../../services/apiValidationErrorHandler';

export function* createReminderAsync(action) {
  const { reminderPayload, history } = action;
  try {
    const response = yield call(ReminderAPI.createReminder, reminderPayload);
    yield put(createReminderSuccess(response.data));
    toast.success(response.data.message);
    history.push('/settings/reminders');
  } catch (error) {
    let errors = {};
    if(error.response && error.response.status === 422) {
      errors = apiValidationErrorHandler(error);
    }
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);

    yield put(createReminderFailure(errors));
  }
}

export function* watchCreateReminder() {
  yield takeLatest(CREATE_REMINDER, createReminderAsync);
}
