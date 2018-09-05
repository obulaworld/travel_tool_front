import moxios from 'moxios';
import RoleAPI from '../RoleAPI';
import expectedResponse from '../__mocks__/mocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('RequestAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a GET request to get users requests with a particular role', async () => {
    const roleId = 53908;
    moxios.stubRequest(`${baseUrl}/user/roles/${roleId}`, {
      status: 200,
      response: {...expectedResponse}
    });
    const response = await RoleAPI.getRoleUsers(53908);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/user/roles/${roleId}`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });
});
