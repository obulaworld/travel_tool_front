import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import TravelStipendsAPI from '../../../services/TravelStipendsAPI';
import {
  watchCreateTravelStipendAsync,
  watchgetAllTravelStipends
} from '../travelStipendsSaga';
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

  describe('Create Travel Stipend Saga', () => {
    const action = {
      requestData: {
        center: 'Kigali',
        stipend: 1234
      }
    };

    const response = {
      data: { newStipend: {
        center: 'Kigali',
        stipend: 1234
      }
      }
    };

    const error = {
      response: {
        status: 422,
        data: {
          errors: [{msg: 'Center is required'}, {msg: 'Stipend is required'}]
        }
      }
    };

    it('Posts a new stipend successfully', () => {
      return expectSaga(watchCreateTravelStipendAsync, TravelStipendsAPI)
        .provide([
          [matchers.call.fn(TravelStipendsAPI.postTravelStipend, action.requestData), response]
        ])
        .put({
          type: 'CREATE_TRAVEL_STIPEND_SUCCESS',
          newStipend: response.data
        })
        .dispatch({
          type: 'CREATE_TRAVEL_STIPEND',
          requestData: action.requestData
        })
        .silentRun();
    });

    it('throws error while creating a new request', () => {
      return expectSaga(watchCreateTravelStipendAsync, TravelStipendsAPI)
        .provide([
          [matchers.call.fn(TravelStipendsAPI.postTravelStipend, action.requestData), throwError(error)]
        ])
        .put({
          type: 'CREATE_TRAVEL_STIPEND_FAILURE',
          error: 'Center is required, Stipend is required'
        })
        .dispatch({
          type: 'CREATE_TRAVEL_STIPEND',
          requestData: action.requestData
        })
        .silentRun();
    });
  });
});
