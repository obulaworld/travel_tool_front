import * as types from '../constants/actionTypes';

export const fetchUserRequests = url => {
  return {
    type: types.FETCH_USER_REQUESTS,
    url
  };
};

export const fetchUserRequestsSuccess = response => {
  return {
    type: types.FETCH_USER_REQUESTS_SUCCESS,
    response
  };
};

export const fetchUserRequestsFailure = error => {
  return {
    type: types.FETCH_USER_REQUESTS_FAILURE,
    error
  };
};
