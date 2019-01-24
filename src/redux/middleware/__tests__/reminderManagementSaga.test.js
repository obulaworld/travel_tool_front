import {expectSaga} from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {throwError} from 'redux-saga-test-plan/providers';
import { payload, errors, response, enableResponse
} from '../../__mocks__/reminderManagement';
import {watchCreateEmailReminderTemplate,
  watchEnableEmailReminderTemplate
} from '../reminderManagementSaga';
import ReminderManagementAPI from '../../../services/ReminderManagementAPI';

import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../../constants/actionTypes';

describe('Reminder Management Saga', () => {
  const error = new Error('Server error, try again');
  error.response = { status: 500};

  const validationError = new Error('Validation failed');
  validationError.response = { data: {errors} , status: 422};

  describe('Reminder Setup', () => {
    it('creates a reminder email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), response]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
          response: response.data
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles 422 errors from creating an email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), throwError(validationError)]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors: {
            [errors[0].name]: errors[0].message
          }
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });

    it('handles other errors from creating an email template', () => {
      return expectSaga(watchCreateEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.createEmailReminderTemplate, payload), throwError(error)]
        ])
        .put({
          type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors: {}
        })
        .dispatch({
          type: CREATE_REMINDER_EMAIL_TEMPLATE,
          payload,
          history: { push: jest.fn()}
        })
        .silentRun();
    });
  });
  describe('Reminder Enabling', () => {
    const errors = new Error('Server error, try again');
    errors.response = { status: 500};
    const templateId = 1;
    it('should enable a reminder email template', () => {
  
      return expectSaga(watchEnableEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.enableEmailTemplates, templateId), throwError(errors)]
        ])
        .put({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
          errors 
        })
        .dispatch({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE,
          templateId
          
        })
        .silentRun();
    });
    it('should enable a reminder email template', () => {
  
      return expectSaga(watchEnableEmailReminderTemplate)
        .provide([
          [call(ReminderManagementAPI.enableEmailTemplates, templateId), enableResponse]
        ])
        .put({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
          enabledTemplate: enableResponse.data.updatedTemplate, templateId
        })
        .dispatch({
          type: ENABLE_REMINDER_EMAIL_TEMPLATE,
          templateId
        })
        .silentRun();
    });
  });
});

