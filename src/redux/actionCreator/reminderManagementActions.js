import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../constants/actionTypes';

export const createReminderEmailTemplate = (payload, history) => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE,
  payload,
  history
});

export const createReminderEmailTemplateSuccess = response => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  response
});

export const createReminderEmailTemplateFailure = errors => ({
  type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  errors
});
