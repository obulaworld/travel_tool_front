import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../../constants/actionTypes';
import {
  createReminderEmailTemplate,
  createReminderEmailTemplateFailure,
  createReminderEmailTemplateSuccess,
  enableReminderEmailTemplate,
  enableReminderEmailTemplateFailure,
  enableReminderEmailTemplateSuccess
} from '../reminderManagementActions';
import { payload, errors, response,
  enableResponse, enableErrors
} from '../../__mocks__/reminderManagement';

describe('Reminder Management Actions', () => {
  describe('Reminder Setup Actions', () => {
    it('should return action of type CREATE_REMINDER_EMAIL_TEMPLATE', () => {
      const expected = {
        type: CREATE_REMINDER_EMAIL_TEMPLATE,
        payload,
        history: {
          push: {}
        }
      };
      const created = createReminderEmailTemplate(payload, {push: {}});
      expect(created).toEqual(expected);
    });

    it('should return an action of type CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS', () => {
      const expected = {
        type: CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
        response
      };
      expect(createReminderEmailTemplateSuccess(response)).toEqual(expected);
    });

    it('should return an action of type CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE', () => {
      const expected = {
        type: CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
        errors
      };
      expect(createReminderEmailTemplateFailure(errors)).toEqual(expected);
    });
  });
  describe('Reminder Enable Actions', () => {
    const templateId = 7;
    it('should return action of type ENABLE_EMAIL_TEMPLATE', () => {
      const expected = {
        type: ENABLE_REMINDER_EMAIL_TEMPLATE,
        templateId
      };
      const enabled = enableReminderEmailTemplate(templateId);
      expect(enabled).toEqual(expected);
    });

    it('should return an action of type ENABLE_EMAIL_TEMPLATE', () => {
      const expected = {
        type: ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
        enabledTemplate:enableResponse.data.updatedTemplate,
        reason: enableResponse.data.reason
      };
      expect(enableReminderEmailTemplateSuccess(enableResponse.data.updatedTemplate)).toEqual(expected);
    });

    it('should return an action of type DISABLE_EMAIL_TEMPLATE_FAILURE', () => {
      const expected = {
        type: ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE,
        errors: enableErrors
      };
      expect(enableReminderEmailTemplateFailure(enableErrors)).toEqual(expected);
    });
  });

});
