import {
  fetchEmailReminder,
  fetchEmailReminderFailure,
  fetchEmailReminderSuccess
} from '../emailReminderAction';

import {
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_FAILURE
} from '../../constants/actionTypes';

import emailReminderMockData from '../../__mocks__/emailReminderConditionMockData';

describe('Email Reminder Action', () => {
  it('should return FETCH_EMAIL_REMINDERS_SUCCESS', () => {
    const expectedAction = {
      type: 'FETCH_EMAIL_REMINDERS_SUCCESS'
    };
    const newAction = fetchEmailReminderSuccess(emailReminderMockData);
    expect(newAction.type).toEqual(expectedAction.type);
  });

  it('should  return action TYPE FETCH_EMAIL_REMINDERS', () => {
    const expectedActionType = {
      type: 'FETCH_EMAIL_REMINDERS'
    };
    const newAction = fetchEmailReminder();
    expect(newAction.type).toEqual(expectedActionType.type);
  });

  it('should  return action TYPE FETCH_EMAIL_REMINDERS', () => {
    const expectedActionType = {
      type: 'FETCH_EMAIL_REMINDERS_FAILURE'
    };
    const newAction = fetchEmailReminderFailure({});
    expect(newAction.type).toEqual(expectedActionType.type);
  });
});
