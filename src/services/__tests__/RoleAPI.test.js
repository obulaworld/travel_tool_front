import moxios from 'moxios';
import RoleAPI from '../RoleAPI';
import { roleResponses } from '../__mocks__/serviceMocks';
import expectedResponse from '../__mocks__/mocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';
const id = 'JFENDVNDK';

describe('UserAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get role details ', async () => {
    moxios.stubRequest(`${baseUrl}/user/roles`, {
      status: 200,
      response: { ...roleResponses }
    });
    const response = await RoleAPI.getRoleData(id);
    const role = moxios.requests.mostRecent();
    expect(role.url).toEqual(`${baseUrl}/user/roles`);
    expect(role.config.method).toEqual('get');
    expect(response.data).toEqual(roleResponses);
  });

  it('should send a POST request to updated a users role', async () => {
    const role = {
      email: 'super.mario@andela.com',
      roleName: 'Hero Head'
    };

    moxios.stubRequest(`${baseUrl}/user/role/update`, {
      status: 201,
      response: {
        email: 'super.mario@andela.com',
        roleName: 'Hero Head'
      }
    });

    const response = await RoleAPI.putData(role);
    expect(moxios.requests.mostRecent().url).toEqual(
      `${baseUrl}/user/role/update`
    );
    expect(response.data).toEqual({
      email: 'super.mario@andela.com',
      roleName: 'Hero Head'
    });
  });

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
        response: { ...expectedResponse }
      });
      const response = await RoleAPI.getRoleUsers(53908);
      const request = moxios.requests.mostRecent();
      expect(request.url).toEqual(`${baseUrl}/user/roles/${roleId}`);
      expect(request.config.method).toEqual('get');
      expect(response.data).toEqual(expectedResponse);
    });
  });
});
