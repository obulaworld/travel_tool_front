import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE
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

export const enableReminderEmailTemplate = templateId => ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE,
  templateId
});

export const enableReminderEmailTemplateSuccess = (enabledTemplate, templateId )=> ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  enabledTemplate,
  templateId
});

export const enableReminderEmailTemplateFailure = errors => ({
  type: ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  errors
});
