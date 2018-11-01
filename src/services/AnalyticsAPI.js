import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

export default class AnalyticsAPI {
  static getAnalytics(query) {
    const responseType = (query === '?type=file') ? 'blob' : 'json';
    return axios.get(`${baseUrl}/analytics${query}`, { responseType });
  }

  static getDepartmentTrips(query) {
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(
      `${baseUrl}/analytics/trips/departments?filterBy=${query.filterBy}&type=${query.type}`,
      {
        responseType,
      }
    );
  }
}
