import requestsReducer from '../requests';
import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
} from '../../constants/actionTypes';
import response from '../../__mocks__/mocks';

const initialState = {};

const error = 'Error fetching requests, network error'

describe('Requests Reducer', () => {
  it('returns the correct initial state', (done) => {
    expect(requestsReducer(undefined, {})).toEqual({});
    done();
  });

  it('returns the correct state for FETCH_USER_REQUESTS action', (done) => {
    const action = {
      type: FETCH_USER_REQUESTS
    };
    expect(requestsReducer(initialState, action)).toEqual({
      isLoading: true,
    });
    done();
  });

  it('returns the correct state for FETCH_USER_REQUESTS_SUCCESS action', (done) => {
    const action = {
      type: FETCH_USER_REQUESTS_SUCCESS,
      response,
    };
    expect(requestsReducer(initialState, action)).toEqual({
      isLoading: false,
      requests: response.requests,
      openRequestsCount: response.openRequestsCount,
      pastRequestsCount: response.pastRequestsCount,
      pagination: response.pagination,
      url: response.url,
    });
    done();
  });

  it('returns the correct state for FETCH_USER_REQUESTS_FAILURE action', (done) => {
    const action = {
      type: FETCH_USER_REQUESTS_FAILURE,
      error: 'Possible network error, please reload the page',
    };
    expect(requestsReducer(initialState, action)).toEqual({
      isLoading: false,
      fetchRequestsError: 'Possible network error, please reload the page',
    });
    done();
  });
});
