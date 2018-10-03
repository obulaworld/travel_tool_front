import moxios from 'moxios';
import AccommodationAPI from '../AccommodationAPI';
import guestHouses from '../../views/Accommodation/__mocks__/mockData/guestHouses';

const baseUrl = 'http://127.0.0.1:5000/api/v1';
const expectedResponse = {
  success: true,
  guestHouses,
  message: 'Successfully retrieved guestHouses',
}

describe('AccommodationAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should sends a GET request to get accommodation centres', async () => {
    moxios.stubRequest(`${baseUrl}/guesthouses`, {
      status: 200,
      response: {
        ...expectedResponse
      }
    });
    const response = await AccommodationAPI.getAccommodationCentres();
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/guesthouses`);
    expect(request.config.method).toEqual('get');
    expect(response.data).toEqual(expectedResponse);
  });
});
