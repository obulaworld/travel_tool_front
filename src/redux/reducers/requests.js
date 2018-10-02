import {
  FETCH_USER_REQUESTS,
  FETCH_USER_REQUESTS_SUCCESS,
  FETCH_USER_REQUESTS_FAILURE,
  CREATE_NEW_REQUEST,
  CREATE_NEW_REQUEST_SUCCESS,
  CREATE_NEW_REQUEST_FAILURE,
  FETCH_USER_REQUEST_DETAILS,
  FETCH_USER_REQUEST_DETAILS_SUCCESS,
  FETCH_USER_REQUEST_DETAILS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  requestData: {
    trips: []
  }
};
const requests = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_USER_REQUESTS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_USER_REQUESTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      message: action.message,
      requests: action.requests,
      openRequestsCount: action.meta.count.open,
      pastRequestsCount: action.meta.count.past,
      pagination: action.meta.pagination
    };
  case FETCH_USER_REQUESTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      fetchRequestsError: action.error
    };
  case CREATE_NEW_REQUEST:
    return {
      ...state,
      creatingRequest: true
    };
  case CREATE_NEW_REQUEST_SUCCESS:
    return {
      ...state,
      creatingRequest: false,
      request: action.newRequest,
      requests: [action.newRequest, ...state.requests],
      openRequestsCount: state.openRequestsCount + 1,
      errors: []
    };
  case CREATE_NEW_REQUEST_FAILURE:
    return {
      ...state,
      creatingRequest: false,
      errors: [...action.error]
    };
  case FETCH_USER_REQUEST_DETAILS:
    return {
      fetchingRequest: true
    };
  case FETCH_USER_REQUEST_DETAILS_SUCCESS:
    return {
      ...state,
      fetchingRequest: false,
      requestData: action.requestData,
      comments: action.requestData.comments.sort( (commentDate1, commentDate2) =>  (commentDate1.createdAt > commentDate2.createdAt))
    };
  case FETCH_USER_REQUEST_DETAILS_FAILURE:
    return {
      ...state,
      fetchingRequest: false,
      errors: action.error
    };
  default:
    return state;
  }
};

export default requests;
