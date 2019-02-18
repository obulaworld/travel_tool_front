import moxios from 'moxios';
import TravelReasonsAPI from '../TravelReasonsAPI';

describe('TravelReasonsAPI', () => {
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('sends a request to the API with a query',  async () => {
    const query = '?page=1&search=Bootcamp';
    moxios.stubRequest(`${baseUrl}/request/reasons${query}`, { status: 200});
    const response = await TravelReasonsAPI.getAllTravelReasons(query);
    const request = (moxios.requests.mostRecent());
    expect(request.url).toEqual(`${baseUrl}/request/reasons${query}`);
    expect(response.status).toEqual(200);
  });

  it('sends a request to the API to create a travel reason', async () => {
    const body = {
      title: 'title',
      description: 'description'
    };

    moxios.stubRequest(`${baseUrl}/request/reasons`, { status: 201 });

    const response = await TravelReasonsAPI.createTravelReasons(body);
    const request = (moxios.requests.mostRecent());

    expect(request.url).toEqual(`${baseUrl}/request/reasons`);
    expect(response.status).toEqual(201);
  });
});
