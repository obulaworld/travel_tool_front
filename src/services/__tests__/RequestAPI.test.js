import moxios from 'moxios';
import RequestAPI from '../RequestAPI';
import expectedResponse from '../__mocks__/mocks';

describe('RequestAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get user\'s requests with a query', async () => {
    const url = '?page=2';
     moxios.stubRequest('http://127.0.0.1:5000/api/v1/requests?page=2', {
       status: 200,
       response: {...expectedResponse}
     });
     const response = await RequestAPI.getUserRequests(url);
     const request = (moxios.requests.mostRecent());
     expect(request.url).toEqual('http://127.0.0.1:5000/api/v1/requests?page=2');
     expect(request.config.method).toEqual('get')
     expect(response.data).toEqual(expectedResponse);
  });

  it('should sends a GET request to get user\'s requests without a query', async () => {
    moxios.stubRequest('http://127.0.0.1:5000/api/v1/requests?', {
      status: 200,
      response: {...expectedResponse, url: '/requests?'}
    });
    const response = await RequestAPI.getUserRequests();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual('http://127.0.0.1:5000/api/v1/requests?');
    expect(request.config.method).toEqual('get')
    expect(response.data).toEqual({...expectedResponse, url: '/requests?'});
 });
});
