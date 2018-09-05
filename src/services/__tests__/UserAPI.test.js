import moxios from 'moxios';
import UserAPI from '../UserAPI';
import { userResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';
const id = 'JFENDVNDK';

describe('UserAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get user\'s details ', async () => {
    moxios.stubRequest(`${baseUrl}/user/JFENDVNDK`, {
      status: 200,
      response: { ...userResponse }
    });
    const response = await UserAPI.getUserData(id);
    const role = moxios.requests.mostRecent();
    expect(role.url).toEqual(`${baseUrl}/user/JFENDVNDK`);
    expect(role.config.method).toEqual('get');
    expect(response.data).toEqual(userResponse);
  });

  it('should send a POST request to create a new user', async () => {
    const user = {
      fullName: 'Super mario',
      email: 'super.mario@andela.com',
      userId: '9i4hjref9'
    };

    moxios.stubRequest(`${baseUrl}/user`, {
      status: 201,
      response: {
        fullName: 'Super mario',
        email: 'super.mario@andela.com',
        userId: '9i4hjref9'
      }
    });

    const response = await UserAPI.postNewUsers(user);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/user`);
    expect(response.data).toEqual({
      fullName: 'Super mario',
      email: 'super.mario@andela.com',
      userId: '9i4hjref9'
    });
  });
});
