import {
  FETCH_USER_APPROVALS,
  FETCH_USER_APPROVALS_SUCCESS,
  FETCH_USER_APPROVALS_FAILURE
} from '../constants/actionTypes';

export const fetchUserApprovals = (url) => ({ //eslint-disable-line
  type: FETCH_USER_APPROVALS,
  url
});


export const fetchUserApprovalsSuccess = (response) => ({
  type: FETCH_USER_APPROVALS_SUCCESS,
  approvals: response.approvals,
  message: response.message,
  meta:  response.meta
});

export const fetchUserApprovalsFailure = (error) => ({
  type: FETCH_USER_APPROVALS_FAILURE,
  error
});
