import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE
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
  case CREATE_NEW_REQUEST:
    return {
      ...state,
      creatingRequest: true,
    };
  case CREATE_NEW_REQUEST_SUCCESS:
    return {
      ...state,
      creatingRequest: false,
      request: action.newRequest,
      requests: [action.newRequest, ...state.requests],
      errors: []
    };
  case CREATE_NEW_REQUEST_FAILURE:
    return {
      ...state,
      creatingRequest: false,
      errors: [...action.error]
    };
  default: return state;
  }
};

export default requests;
