import {
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE
} from '../constants/actionTypes';

export const fetchUserRequests = url => ({
  type: FETCH_USER_REQUESTS,
  url
});

export const fetchUserRequestsSuccess = ({requests, meta, message}) => ({
  type: FETCH_USER_REQUESTS_SUCCESS,
  requests,
  meta,
  message,
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

export const fetchUserRequestDetails = (requestId) => ({
  type: FETCH_USER_REQUEST_DETAILS,
  requestId
});

export const fetchUserRequestDetailsSuccess = (requestData) => ({
  type: FETCH_USER_REQUEST_DETAILS_SUCCESS,
  requestData
});

export const fetchUserRequestDetailsFailure = (error) => ({
  type: FETCH_USER_REQUEST_DETAILS_FAILURE,
  error,
});
