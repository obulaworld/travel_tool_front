import {
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE
} from '../constants/actionTypes';

export const fetchUserRequests = url => ({
  type: FETCH_USER_REQUESTS,
  url
});

export const fetchUserRequestsSuccess = response => ({
  type: FETCH_USER_REQUESTS_SUCCESS,
  response
});

export const fetchUserRequestsFailure = error => ({
  type: FETCH_USER_REQUESTS_FAILURE,
  error
});

export const createNewRequest = (requestData) => ({
  type: CREATE_NEW_REQUEST,
  requestData,
});

export const createNewRequestSuccess = (newRequest) => ({
  type: CREATE_NEW_REQUEST_SUCCESS,
  newRequest,
});

export const createNewRequestFailure = (error) => ({
  type: CREATE_NEW_REQUEST_FAILURE,
  error,
});
