import moxios from 'moxios';
import ReminderManagementAPI from '../ReminderManagementAPI';
import { payload, errors, response } from '../../redux/__mocks__/reminderManagement';

import { resolveBaseUrl} from '..';

const baseUrl = resolveBaseUrl();

describe('ReminderManagementAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a reminder email template', async () => {
    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates`, {
      status: 200,
      response
    });
    const res = await ReminderManagementAPI.createEmailReminderTemplate(payload);

    expect(res.data).toEqual({
      data: response.data
    });
  });
});
