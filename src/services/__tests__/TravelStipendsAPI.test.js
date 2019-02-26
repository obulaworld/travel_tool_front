import moxios from 'moxios';
import TravelStipendsAPI from '../TravelStipendsAPI';
import RequestAPI from "../RequestAPI";

describe('TravelStipendsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a request to the API',  async () => {
    moxios.stubRequest(`${baseUrl}/travelStipend`, { status: 200});
    const response = await TravelStipendsAPI. getAllTravelStipends();
    const stipends = moxios.requests.mostRecent();
    expect(stipends.url).toEqual(`${baseUrl}/travelStipend`);
    expect(stipends.config.method).toEqual('get');
    expect(response.status).toEqual(200);
  });

  it('should send a DELETE request to the API', async () => {
    const stipendId = '1';
    moxios.stubRequest(`${baseUrl}/travelStipend/${stipendId}`, {
      status: 200,
      response: {
        message: 'Travel stipend deleted successfully'
      }
    });
    const response = await TravelStipendsAPI.deleteTravelStipend(stipendId);
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/travelStipend/${stipendId}`);
    expect(moxios.requests.mostRecent().config.method).toEqual('delete');
    expect(response.data).toEqual({
      message: 'Travel stipend deleted successfully'
    });
  });
});
