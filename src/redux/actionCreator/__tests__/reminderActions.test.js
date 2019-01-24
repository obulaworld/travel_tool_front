import * as types from '../../constants/actionTypes';
import * as actions from '../reminderActions';

describe('Reminder actions', () => {
  describe('fetch reminder email templates', () => {
    it('should create the action CREATE_REMINDER type', () => {
      const reminderPayload = {
        documentType: 'passport',
        conditionName: 'Passport reminder',
      };

      const expectedAction = {
        type: types.CREATE_REMINDER,
        reminderPayload,
      };

      const action = actions.createReminder(reminderPayload);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action CREATE_REMINDER_SUCCESS type', () => {
      const createdReminder = {
        condition: {
          id: 1,
          conditionName: 'Passport reminder'
        },
        reminders: [{ id: 1}, { id: 2}]
      };
      const expectedAction = {
        type: types.CREATE_REMINDER_SUCCESS,
        createdReminder,
      };

      const action = actions.createReminderSuccess(createdReminder);
      expect(action).toEqual(expectedAction);
    });

    it('should create the action CREATE_REMINDER_FAILURE type', () => {
      const errors = 'Error creating reminder';
      const expectedAction = {
        type: types.CREATE_REMINDER_FAILURE,
        errors,
      };

      const action = actions.createReminderFailure(errors);
      expect(action).toEqual(expectedAction);
    });

  });
});
