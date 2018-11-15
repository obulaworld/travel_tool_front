import axios from 'axios';
import {resolveBaseUrl} from '.';

// const baseUrl = resolveBaseUrl();

class CalendarAnalyticsAPI{
  static getCalendarAnalytics = (query)=>{
    const location = localStorage.getItem('location');
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(`https://9037dd44-1f6b-49d6-b704-55a8200ca229.mock.pstmn.io/analytics/calendar?type=${query.type}&location=${location}&${query.filter}`, {
      responseType
    });
  }
}

export default CalendarAnalyticsAPI;
