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

});
