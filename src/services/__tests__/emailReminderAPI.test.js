import moxios from 'moxios';
import emailReminder from '../emailReminderAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('EmailReminderAPI', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });



  it('should send a GET request to fetch reminders', async () => {

    moxios.stubRequest(`${baseUrl}/reminders`, {
      status: 200,
      response: {
        documents: 'Successfully retrieved reminders'
      }
    });

    const response = await emailReminder.getEmailReminders();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/reminders`);
    expect(response.data).toEqual({
      documents: 'Successfully retrieved reminders'
    });
  });

  it('should send a PUT request to disable a reminder with reason', async () => {
    const conditionId = '3';
    const reason = {
      reason: { disableReason: 'No longer applicable' }
    };

    moxios.stubRequest(`${baseUrl}/reminders/conditions/disable/${conditionId}`, {
      status: 200,
      response: {
        condition: 'Condition has been successfully disabled'
      }
    });

    const response = await emailReminder.disableEmailReminderCondition({conditionId, reason});

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/reminders/conditions/disable/${conditionId}`);
    expect(response.data).toEqual({
      condition: 'Condition has been successfully disabled'
    });
  });
});
