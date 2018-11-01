import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import TravelCalendarAPI from '../../../services/TravelCalendarAPI';
import { watchFetchCalendarAnalytics } from '../travelCalendarSaga';
import { fetchTravelCalendarResponse } from '../../__mocks__/mocks';
import { FETCH_CALENDAR_ANALYTICS_SUCCESS, FETCH_CALENDAR_ANALYTICS, FETCH_CALENDAR_ANALYTICS_FAILURE } from '../../constants/actionTypes';

const query = {type:'json', filter:''};
const error = 'Possible network error, please reload the page';
const response = {
  data: {
    ...fetchTravelCalendarResponse
  }
};

describe('Travel Calendar Saga', () => {
  it('should fetch travel calendar analytics as json', () => {
    return expectSaga(watchFetchCalendarAnalytics, TravelCalendarAPI)
      .provide([
        [matchers.call.fn(TravelCalendarAPI.getCalendarAnalytics, query), response]
      ])
      .put({
        type: FETCH_CALENDAR_ANALYTICS_SUCCESS,
        data: response.data
      })
      .dispatch({
        type: FETCH_CALENDAR_ANALYTICS,
        query
      })
      .run();
  });

  it('should throw an error if there is an error fetching travel calendar data', () => {
    return expectSaga(watchFetchCalendarAnalytics, TravelCalendarAPI)
      .provide([
        [matchers.call.fn(TravelCalendarAPI.getCalendarAnalytics, query), throwError(error)]
      ])
      .put({
        type: FETCH_CALENDAR_ANALYTICS_FAILURE,
        error
      })
      .dispatch({
        type: FETCH_CALENDAR_ANALYTICS,
        query
      })
      .run();
  });
});
