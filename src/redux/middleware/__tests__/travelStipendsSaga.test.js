import { call } from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import {watchgetAllTravelStipends} from '../travelStipendsSaga';
import TravelStipendsAPI from '../../../services/TravelStipendsAPI';
import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS
} from '../../constants/actionTypes';
import mockData from '../../../mockData/travelStipend';

describe('Travel stipends Saga', () => {
  const { stipends} = mockData;
  it('gets a response with travel stipends and dispatches FETCH_ALL_TRAVEL_STIPENDS_SUCCESS', () => {
    const response = {
      data: {
        success: true,
        message: 'Travel Stipends retrieved successfully',
        stipends: stipends
      }
    };
    return expectSaga(watchgetAllTravelStipends)
      .provide([[call(TravelStipendsAPI.getAllTravelStipends), response]])
      .put({
        type: FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
        stipends: response.data.stipends
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_STIPENDS
      })
      .silentRun();
  });

  it('handles an error', () => {
    const error = new Error('Server error, try again');
    error.response = { status: 500 };
    return expectSaga(watchgetAllTravelStipends)
      .provide([[call(TravelStipendsAPI.getAllTravelStipends), throwError(error)]])
      .put({
        type: FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
        error: 'Server error, try again'
      })
      .dispatch({
        type: FETCH_ALL_TRAVEL_STIPENDS
      })
      .silentRun();
  });
});
