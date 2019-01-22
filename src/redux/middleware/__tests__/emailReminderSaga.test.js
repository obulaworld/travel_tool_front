import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import toast from 'toastr';
import * as matchers from 'redux-saga-test-plan/matchers';
import {watchfetchEmailReminders, watchDisableReminderCondition} from '../emailRemindersSaga';
import emailReminderAPI from '../../../services/emailReminderAPI';
import {
  FETCH_EMAIL_REMINDERS,
  DISABLE_REMINDER_CONDITION,
  DISABLE_REMINDER_CONDITION_SUCCESS,
  DISABLE_REMINDER_CONDITION_FAILURE
} from '../../constants/actionTypes';

toast.error = jest.fn();
toast.success = jest.fn();

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

describe('Reminders Saga', () => {
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

  describe('Should disable email reminder condition', () => {
    const conditionId = '23ErGDS6';
    const reason = 'No more applicable';
    const response = {
      data: {
        success: true,
        message: 'Condition has been successfully disabled',
        condition: {conditionName: 'Travel Readiness reminder for visa'}
      }
    };
    const error = new Error('Possible network error, please reload the page');
  
    it('disables a reminder condition successfully', () => {
      return expectSaga(watchDisableReminderCondition)
        .provide([[
          call(emailReminderAPI.disableEmailReminderCondition, {
            conditionId, reason
          }),
          response
        ]])
        .put({
          type: DISABLE_REMINDER_CONDITION_SUCCESS,
          condition: response.data.condition,
        })
        .dispatch({
          type: DISABLE_REMINDER_CONDITION,
          conditionId,
          reason,
        })
        .silentRun();
    });
    it('fails to disable reminder condition', () => {
      error.response = { status: 500 };
  
      return expectSaga(watchDisableReminderCondition)
        .provide([[
          call(emailReminderAPI.disableEmailReminderCondition, {
            conditionId
          }),
          throwError(error)
        ]])
        .put({
          type: DISABLE_REMINDER_CONDITION_FAILURE,
          error: error.message
        })
        .dispatch({
          type: DISABLE_REMINDER_CONDITION,
          conditionId,
        })
        .silentRun();
    });
  });
});
