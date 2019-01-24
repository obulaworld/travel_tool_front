import {
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS_FAILURE
} from '../constants/actionTypes';

export const fetchEmailReminder = (query) => {
  return {
    type: FETCH_EMAIL_REMINDERS,
    query
  };

};

export const fetchEmailReminderSuccess = (data) => {
  return {
    type: FETCH_EMAIL_REMINDERS_SUCCESS,
    payload: data
  };
};

export const fetchEmailReminderFailure = (error) => {
  return {
    type: FETCH_EMAIL_REMINDERS_FAILURE,
    payload: error
  };
};
