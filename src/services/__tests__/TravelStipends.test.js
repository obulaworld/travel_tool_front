import moxios from 'moxios';
import TravelStipendsAPI from '../TravelStipendsAPI';

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
});
