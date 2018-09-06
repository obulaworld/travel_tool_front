import {
  FETCH_USER_APPROVALS,
  FETCH_USER_APPROVALS_SUCCESS,
  FETCH_USER_APPROVALS_FAILURE
} from '../constants/actionTypes';

const initState = {
  approvals: [],
  isLoading: false,
  message: '',
  openApprovalsCount: '',
  pastApprovalsCount: '',
  pagination: '',
  fetchApprovalError: ''
};

const approvals = (state = initState, action) => {
  switch (action.type) {
  case FETCH_USER_APPROVALS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_USER_APPROVALS_SUCCESS:
    return {
      ...state,
      approvals: action.approvals,
      isLoading: false,
      message: action.message,
      openApprovalsCount: action.meta.count.open,
      pastApprovalsCount: action.meta.count.past,
      pagination: action.meta.pagination
    };
  case FETCH_USER_APPROVALS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchApprovalsError: action.error,
    };
  default:
    return state;
  }
};

export default approvals;
