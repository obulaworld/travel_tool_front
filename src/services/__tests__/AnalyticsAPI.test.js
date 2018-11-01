import moxios from 'moxios';
import AnalyticsAPI from '../AnalyticsAPI';
import {
  fetchDepartmentsTripsResponse
} from '../__mocks__/serviceMocks';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('Analytics API', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make a get request to get trips department analytics', async () => {
    const query = {
      filterBy: 'month',
      type: 'json'
    };

    moxios.stubRequest(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&type=${query.type}`, {
      status: 200,
      response: fetchDepartmentsTripsResponse
    });

    const response = await AnalyticsAPI.getDepartmentTrips(query);

    expect(moxios.requests.mostRecent().url)
      .toEqual(`${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&type=${query.type}`);
    expect(response.data).toEqual(fetchDepartmentsTripsResponse);
  });
});
