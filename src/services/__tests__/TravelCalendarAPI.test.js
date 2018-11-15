import moxios from 'moxios';
import TravelCalendarAPI from '../TravelCalendarAPI';
import { fetchTravelCalendarResponse } from '../__mocks__/serviceMocks';

const baseUrl = 'https://9037dd44-1f6b-49d6-b704-55a8200ca229.mock.pstmn.io';


describe('Travel Calendar API', () => {
  beforeEach(() => {
    moxios.install();
    localStorage.setItem('location', 'Nairobi');
  });

  afterEach(() => {
    moxios.uninstall();
  });


  it('should make get request to get travel calendar analytics', async () => {
    const query = {type: 'json', filter: ''};
    const location = localStorage.getItem('location')

    moxios.stubRequest(`${baseUrl}/analytics/calendar?type=${query.type}&location=${location}&${query.filter}`, {
      status: 200,
      response: fetchTravelCalendarResponse
    });

    const response = await TravelCalendarAPI.getCalendarAnalytics(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics/calendar?type=${query.type}&location=${location}&${query.filter}`);
    expect(response.data).toEqual(fetchTravelCalendarResponse);
  });
});
