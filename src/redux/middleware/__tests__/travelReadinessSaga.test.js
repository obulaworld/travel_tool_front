import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import FileSaver from 'file-saver';
import ReadinessAPI from '../../../services/ReadinessAPI';
import {
  watchFetchReadiness
} from '../travelReadinessSaga';
import {
  fetchReadinessResponse
} from '../../__mocks__/mocks';
import {
  FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_SUCCESS, FETCH_TRAVEL_READINESS_FAILURE
} from '../../constants/actionTypes';

FileSaver.saveAs = jest.fn();
describe('Test suite for Travel Readiness Analytics Saga', () => {
  const query = {
    page: '1',
    limit: '5',
    type: 'json'
  };
  it('should return travel readiness analytics if request was succesful', () => {
    const response = {
      data: fetchReadinessResponse
    };
    return expectSaga(watchFetchReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.getTravelReadiness, query), response]
      ])
      .put({
        type: FETCH_TRAVEL_READINESS_SUCCESS,
        response: fetchReadinessResponse.readiness
      })
      .dispatch({
        type: FETCH_TRAVEL_READINESS,
        query
      })
      .run();
  });
  it('should throw an error if request failed', () => {
    const error = {
      response: {
        status: 422,
        data: {
          errors: [{message: 'type must be "json" or "file"'}]
        }
      }
    };
    return expectSaga(watchFetchReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.getTravelReadiness, query), throwError(error)]
      ])
      .put({
        type: FETCH_TRAVEL_READINESS_FAILURE,
        error: 'Bad request. type must be "json" or "file"'
      })
      .dispatch({
        type: FETCH_TRAVEL_READINESS,
        query
      })
      .run();
  });
  it('should call FileSaver.saveAs function if the action type is file', () => {
    const response = {
      data: fetchReadinessResponse
    };
    query.type = 'file';
    return expectSaga(watchFetchReadiness, ReadinessAPI)
      .provide([
        [call(ReadinessAPI.getTravelReadiness, query), response]
      ])
      .dispatch({
        type: FETCH_TRAVEL_READINESS,
        query
      })
      .run()
      .then(() => {
        expect(FileSaver.saveAs).toHaveBeenCalled();
      });
  });
});
