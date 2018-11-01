import {fetchCalendarAnalytics, fetchCalendarAnalyticsSuccess, fetchCalendarAnalyticsFailure } from '../travelCalendarActions';

describe('Travel Calendar Actions', ()=>{
  const expectedResults = {
      fetchCalendarAnalytics: {
        type: 'FETCH_CALENDAR_ANALYTICS',
        query: ''
      },
      fetchCalendarAnalyticsSuccess: {
        type: 'FETCH_CALENDAR_ANALYTICS_SUCCESS',
        data: {}
      },
      fetchCalendarAnalyticsFailure: {
        type: 'FETCH_CALENDAR_ANALYTICS_FAILURE',
        error: ''
      }
  };

  const params = {
    query: '',
    data: {},
    error: ''
  };

  const {query, data, error} = params;

  it('should return type FETCH_CALENDAR_ANALYTICS', ()=>{
    const res = fetchCalendarAnalytics(query);
    expect(res).toEqual(expectedResults.fetchCalendarAnalytics);
  });
  it('should return type FETCH_CALENDAR_ANALYTICS_SUCCESS', ()=>{
    const res = fetchCalendarAnalyticsSuccess(data);
    expect(res).toEqual(expectedResults.fetchCalendarAnalyticsSuccess);
  });
  it('should return type FETCH_CALENDAR_ANALYTICS_FAILURE', ()=>{
    const res = fetchCalendarAnalyticsFailure(error);
    expect(res).toEqual(expectedResults.fetchCalendarAnalyticsFailure);
  });
});