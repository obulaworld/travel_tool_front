import moxios from 'moxios';
import RequestAPI from '../RequestAPI';
import expectedResponse from '../__mocks__/mocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('RequestAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get user\'s requests with a query', async () => {
    const url = '?page=2';
    moxios.stubRequest(`${baseUrl}/requests?page=2`, {
      status: 200,
      response: {...expectedResponse}
    });
    const response = await RequestAPI.getUserRequests(url);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/requests?page=2`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to get user\'s requests without a query', async () => {
    moxios.stubRequest(`${baseUrl}/requests?`, {
      status: 200,
      response: {...expectedResponse, url: '/requests?'}
    });
    const response = await RequestAPI.getUserRequests();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/requests?`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual({...expectedResponse, url: '/requests?'});
  });

  it('should send a POST request to create a new travel-request', async () => {
    const requestData = {
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    };

    moxios.stubRequest(`${baseUrl}/requests`, {
      status: 201,
      response: {
        name: 'Tester Ademola',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    });

    const response = await RequestAPI.postNewRequest(requestData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/requests`);
    expect(response.data).toEqual({
      name: 'Tester Ademola',
      origin: 'Lagos',
      destination: 'Nairobi'
    });
  });
});
