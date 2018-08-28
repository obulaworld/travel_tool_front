import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import RequestAPI from '../../../services/RequestAPI';
import { watchFetchRequests } from '../requestsSaga';

const url = '/requests?page=2';
const response = {
  data: {
    requests: {
      id: 'xDh20btGz',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Open',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
    pagination: {
      pageCount: 2,
      currentPage: 1,
      dataCount: 3
    },
    url: '/requests?page=1'
  }
};
const error = 'Possible network error, please reload the page';

describe('requestsSaga', () => {
  it('fetches users request', () => {
    return expectSaga(watchFetchRequests, RequestAPI)
      .provide([
        [call(RequestAPI.getUserRequests, url), response]
      ])
      .put({
        type: 'FETCH_USER_REQUESTS_SUCCESS',
        response: response.data
      })
      .dispatch({
        type: 'FETCH_USER_REQUESTS',
        url
      })
      .run();
  });

  it('throws error if there is an error fetching a user\'s requests', () => {
    return expectSaga(watchFetchRequests, RequestAPI)
      .provide([
        [call(RequestAPI.getUserRequests, url), throwError(error)]
      ])
      .put({
        type: 'FETCH_USER_REQUESTS_FAILURE',
        error
      })
      .dispatch({
        type: 'FETCH_USER_REQUESTS',
        url
      })
      .run();
  });
});
