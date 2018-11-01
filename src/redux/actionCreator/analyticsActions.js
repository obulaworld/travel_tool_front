import { FETCH_ANALYTICS, FETCH_ANALYTICS_SUCCESS, FETCH_ANALYTICS_FAILURE } from '../constants/actionTypes';

export const fetchAnalytics = query => ({
  type: FETCH_ANALYTICS,
  query
});

export const fetchAnalyticsSuccess = payload => ({
  type: FETCH_ANALYTICS_SUCCESS,
  payload
});

export const fetchAnalyticsFailure = error => ({
  type: FETCH_ANALYTICS_FAILURE,
  error
});
