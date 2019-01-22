import moxios from 'moxios';
import ReminderManagementAPI from '../ReminderManagementAPI';

describe('ReminderSetup', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends get request to the api with a query', async () => {
    const url = '?page=2';
    moxios.stubRequest(`${baseUrl}/reminderManagement/emailTemplates${url}`, {});
    const response = await ReminderManagementAPI.getAllEmailTemplates(url);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/reminderManagement/emailTemplates${url}`);
    expect(response.data).toEqual();
  });
});
