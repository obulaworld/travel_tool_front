import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../../constants/actionTypes';
import {
  createReminderEmailTemplate,
  createReminderEmailTemplateFailure,
  createReminderEmailTemplateSuccess
} from '../reminderManagementActions';
import { payload, errors, response } from '../../__mocks__/reminderManagement';

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
});
