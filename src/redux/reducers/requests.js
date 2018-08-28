import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
} from '../constants/actionTypes';

const initialState = {};

const requests = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_USER_REQUESTS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_USER_REQUESTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      requests: action.response.requests,
      openRequestsCount: action.response.openRequestsCount,
      pastRequestsCount: action.response.pastRequestsCount,
      pagination: action.response.pagination,
      url: action.response.url,
    };
  case FETCH_USER_REQUESTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchRequestsError: action.error,
    };
  default: return state;
  }
};

export default requests;
