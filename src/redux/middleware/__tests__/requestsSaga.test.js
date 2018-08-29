import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import RequestAPI from '../../../services/RequestAPI';
import { watchFetchRequests, watchCreateNewRequestAsync } from '../requestsSaga';

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

describe('Requests Saga', () => {
  describe('Fetch requests saga', () => {
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
  
  describe('Create New Request Saga', () => {
    const action = {
      requestData: {
        name: 'Incredible Hulk',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    };
  
    const response = {
      data: { request: { name: 'Incredible Hulk', status: 'Open' } }
    };
  
    const error = {
      response: {
        status: 0,
        data: {
          errors: ['name is required', 'destination is required']
        }
      }
    };
  
    it('Posts a new request successfully', () => {
      return expectSaga(watchCreateNewRequestAsync)
        .provide([
          [call(RequestAPI.postNewRequest, action.requestData), response]
        ])
        .put({
          type: 'CREATE_NEW_REQUEST_SUCCESS',
          newRequest: { name: 'Incredible Hulk', status: 'Open' }
        })
        .dispatch({
          type: 'CREATE_NEW_REQUEST',
          requestData: action.requestData
        })
        .run();
    });
  
    it('throws error while creating a new request', () => {
      return expectSaga(watchCreateNewRequestAsync)
        .provide([
          [call(RequestAPI.postNewRequest, action.requestData), throwError(error)]
        ])
        .put({
          type: 'CREATE_NEW_REQUEST_FAILURE',
          error: ['name is required', 'destination is required']
        })
        .dispatch({
          type: 'CREATE_NEW_REQUEST',
          requestData: action.requestData
        })
        .run();
    });
  });
});
