import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import { watchCreateReminder } from '../reminderSaga';
import * as types from '../../constants/actionTypes';
import ReminderAPI from '../../../services/ReminderAPI';

const response = {
  data: {
    'success': true,
    'message': 'Reminder successfully created',
    'reminder': {
      'condition': {
        'id': 1,
        'conditionName': 'Travel Readiness reminder',
        'documentType': 'Passport',
        'userId': '-LMIzC-bCc10w7Uqc7-A',
        'updatedAt': '2019-01-17T05:01:17.325Z',
        'createdAt': '2019-01-17T05:01:17.325Z'
      },
      'reminders': [{
        'id': 1,
        'frequency': '1 Weeks',
        'createdAt': '2019-01-17T05:01:17.338Z',
        'updatedAt': '2019-01-17T05:01:17.338Z',
        'reminderEmailTemplateId': '10',
        'conditionId': 1
      },
      {
        'id': 2,
        'frequency': '5 Days',
        'createdAt': '2019-01-17T05:01:17.338Z',
        'updatedAt': '2019-01-17T05:01:17.338Z',
        'reminderEmailTemplateId': '20',
        'conditionId': 1
      }
      ]
    }
  }
};

const payload = {
  'conditionName': 'Travel Readiness reminder',
  'documentType': 'Passport',
  'reminders': [{
    'frequency': '2 Weeks',
    'reminderEmailTemplateId': '10'
  },
  {
    'frequency': '5 Days',
    'reminderEmailTemplateId': '10'
  }
  ]
};

toast.error = jest.fn();
toast.success = jest.fn();

describe('Reminder sagas', () => {
  describe('createReminderAsync', () => {
    it('creates a reminder', () => {
      return expectSaga(watchCreateReminder, ReminderAPI)
        .provide([
          [call(ReminderAPI.createReminder, payload), response]
        ])
        .put({
          type: types.CREATE_REMINDER_SUCCESS,
          createdReminder: response.data,
        })
        .dispatch({
          type: types.CREATE_REMINDER,
          reminderPayload: payload,
          history: { push: jest.fn() }
        })
        .silentRun();
    });

    it('handles errors from the API', () => {
      return expectSaga(watchCreateReminder)
        .provide([
          [call(ReminderAPI.createReminder, payload), throwError('unable to fetch')]
        ])
        .put({
          type: types.CREATE_REMINDER_FAILURE,
          errors: {},
        })
        .dispatch({
          type: types.CREATE_REMINDER,
          payload,
          history: { push: jest.fn()}
        })
        .run();
    });

    it('handles validation errors from the API', () => {
      const error = new Error('Condition name must be unique');
      error.response = {
        data: {
          errors: [{
            message: 'Reminder condition name already exists',
            name: 'conditionName'
          }]
        },
        status: 422
      };
      return expectSaga(watchCreateReminder)
        .provide([
          [call(ReminderAPI.createReminder, payload), throwError(error)]
        ])
        .put({
          type: types.CREATE_REMINDER_FAILURE,
          errors: {
            conditionName: 'Reminder condition name already exists'
          },
        })
        .dispatch({
          type: types.CREATE_REMINDER,
          reminderPayload: payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });
  });
});
