import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';

import { watchFetchAnalytics } from '../analyticsSaga';
import AnalyticsAPI from '../../../services/AnalyticsAPI';
import { FETCH_ANALYTICS_SUCCESS, FETCH_ANALYTICS, FETCH_ANALYTICS_FAILURE } from '../../constants/actionTypes';

const response =  {
  success: true,
  isLoading: false,
  error: false,
  payload: {
    total_requests: 230
  }
};

const error = 'Error Message';
describe('Test Analytics Saga', () => {
  const response = {
    data:
      { data: {total_requests: 230} }
  };

  it('should fetch all the analytics successfully', () => {
    return expectSaga(watchFetchAnalytics, AnalyticsAPI)
      .provide([[matchers.call.fn(AnalyticsAPI.getAnalytics, '?location'), response]])
      .put({
        type: FETCH_ANALYTICS_SUCCESS,
        payload: response.data.data
      })
      .dispatch({
        type: FETCH_ANALYTICS,
        query: '?location'
      })
      .run();
  });

  it('throws an error when fetching analytics items fails', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    expectSaga(watchFetchAnalytics, AnalyticsAPI)
      .provide([
        [matchers.call.fn(AnalyticsAPI.getAnalytics, '?location'), throwError(error)]
      ])
      .put({
        type: FETCH_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: FETCH_ANALYTICS,
        query: '?location'
      })
      .run();
  });

});
