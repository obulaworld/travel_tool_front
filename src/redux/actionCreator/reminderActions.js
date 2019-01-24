/* eslint-disable import/prefer-default-export */
import * as types from '../constants/actionTypes';

export const createReminder = (reminderPayload, history) => ({
  type: types.CREATE_REMINDER,
  reminderPayload,
  history
});

export const createReminderSuccess = (createdReminder) => ({
  type: types.CREATE_REMINDER_SUCCESS,
  createdReminder,
});

export const createReminderFailure = (errors) => ({
  type: types.CREATE_REMINDER_FAILURE,
  errors,
});
