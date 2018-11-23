import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class CalendarAnalyticsAPI{
  static getCalendarAnalytics = (query)=>{
    const location = localStorage.getItem('location');
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(`${baseUrl}/analytics/calendar?type=${query.type}&location=${location}&${query.filter}&limit=3&page=1`, {
      responseType
    });
  }
}

export default CalendarAnalyticsAPI;
