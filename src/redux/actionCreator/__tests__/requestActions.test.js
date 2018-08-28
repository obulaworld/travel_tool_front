import {
  fetchUserRequests,
  fetchUserRequestsFailure,
  fetchUserRequestsSuccess,
} from '../requestActions';
import response from '../../__mocks__/mocks';

describe('Request Actions', () => {
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
      response
    };
    const createdAction = fetchUserRequestsSuccess(response);
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
