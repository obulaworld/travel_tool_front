import {
  fetchUserRequests,
  fetchUserRequestsFailure,
  fetchUserRequestsSuccess,
  createNewRequest,
  createNewRequestSuccess,
  createNewRequestFailure
} from '../requestActions';
import { fetchRequestsResponse } from '../../__mocks__/mocks';

describe('Requests Actions', () => {
  describe('Fetch Requests Actions', () => {
    it('should return action type FETCH_USER_REQUESTS', () => {
      const url = '/requests?page=1';
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS',
        url
      };
      const createdAction = fetchUserRequests(url);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_REQUESTS_SUCCESS', () => {
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS_SUCCESS',
        requests: fetchRequestsResponse.requests,
        meta: fetchRequestsResponse.meta,
        message: fetchRequestsResponse.message,
      };
      const createdAction = fetchUserRequestsSuccess(fetchRequestsResponse);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_USER_REQUESTS_ERROR', () => {
      const error = 'Error fetching requests, network error';
      const expectedAction = {
        type: 'FETCH_USER_REQUESTS_FAILURE',
        error
      };
      const createdAction = fetchUserRequestsFailure(error);
      expect(createdAction).toEqual(expectedAction);
    });
  });

  describe('Create Request Actions', () => {
    it('should return action of type CREATE_NEW_REQUEST', () => {
      const requestData = {
        name: 'Ademola Ariya',
        origin: 'Lagos',
        destination: 'Nairobi',
        manager: 'Samuel Kubai',
      };

      const receivedAction = {
        type: 'CREATE_NEW_REQUEST',
        requestData: {
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'Nairobi',
          manager: 'Samuel Kubai',
        },
        closeRequestModal: undefined
      };
      const newAction = createNewRequest(requestData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_NEW_REQUEST_SUCCESS', () => {
      const newRequest = {
        name: 'Ademola Ariya',
        origin: 'Lagos',
        destination: 'Nairobi',
        manager: 'Samuel Kubai',
      };

      const receivedAction = {
        type: 'CREATE_NEW_REQUEST_SUCCESS',
        newRequest: {
          name: 'Ademola Ariya',
          origin: 'Lagos',
          destination: 'Nairobi',
          manager: 'Samuel Kubai',
        }
      };
      const newAction = createNewRequestSuccess(newRequest);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action of type CREATE_NEW_REQUEST_FAILURE', () => {
      const error = 'Could not create a new request';
      const receivedAction = {
        type: 'CREATE_NEW_REQUEST_FAILURE',
        error: 'Could not create a new request'
      };
      const newAction = createNewRequestFailure(error);
      expect(newAction).toEqual(receivedAction);
    });
  });
});
