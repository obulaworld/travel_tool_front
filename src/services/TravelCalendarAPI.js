import axios from 'axios';
import {resolveBaseUrl} from '.';

// const baseUrl = resolveBaseUrl();

class CalendarAnalyticsAPI{
  static getCalendarAnalytics = (query)=>{
    const responseType = (query.type === 'file') ? 'blob' : 'json';
    return axios.get(`https://d2f8644c-5c61-4a5f-8fc7-7c0aa26c50eb.mock.pstmn.io/analytics/calendar?type=${query.type}&${query.filter}`, {
      responseType
    });
  }
}

export default CalendarAnalyticsAPI;
