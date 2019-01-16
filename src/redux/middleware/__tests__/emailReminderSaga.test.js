import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {watchfetchEmailReminders} from '../emailRemindersSaga';
import emailReminderAPI from '../../../services/emailReminderAPI';
import {FETCH_EMAIL_REMINDERS} from '../../constants/actionTypes';

const reminders = [
  {
    'id': 2,
    'conditionName': 'Travel Readiness reminder',
    'documentType': 'Visa',
    'createdAt': '2019-01-18T12:17:56.155Z',
    'updatedAt': '2019-01-18T12:17:56.155Z',
    'userId': '-LRvI2dK2s3FTiv65w-M',
    'user': {
      'fullName': 'Michael Nthiwa'
    }
  },
  {
    'id': 4,
    'conditionName': 'Visa Readiness reminder',
    'documentType': 'Visa',
    'createdAt': '2019-01-18T12:37:25.373Z',
    'updatedAt': '2019-01-18T12:37:25.373Z',
    'userId': '-LRvI2dK2s3FTiv65w-M',
    'user': {
      'fullName': 'Michael Nthiwa'
    }
  }
];

const documentCount = {
  'Passport': '1',
  'Visa': '2'
};


const response = {
  data: {
    message: 'Successfully retrieved reminders',
    meta: {documentCount},
    reminders: reminders,
    success: true,
  }
};

const error = {
  payload: 'Possible network error, please reload the page'
};


describe('Should fetch email reminder condition', () => {
  it('fetch a list of all the reminder conditions', () => {
    return expectSaga(watchfetchEmailReminders)
      .provide([
        [matchers.call.fn(emailReminderAPI.getEmailReminders),response]
      ])
      .put({
        type: 'FETCH_EMAIL_REMINDERS_SUCCESS',
        payload: {
          reminders,
          meta: { documentCount}
        }
      })
      .dispatch({
        type: FETCH_EMAIL_REMINDERS
      })
      .silentRun();
  });

  it('throw an error when internal server error', () => {
    return expectSaga(watchfetchEmailReminders)
      .provide([
        [matchers.call.fn(emailReminderAPI.getEmailReminders), error]
      ])
      .put({
        type: 'FETCH_EMAIL_REMINDERS_FAILURE',
        payload: 'Possible network error, please reload the page'
      })
      .dispatch({
        type: FETCH_EMAIL_REMINDERS
      })
      .silentRun();
  });




});
