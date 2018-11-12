import { POST_SUBMISSION, FETCH_SUBMISSION,
  POST_SUBMISSION_SUCCESS, POST_SUBMISSION_FAILURE, FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE } from  '../constants/actionTypes';

export const initialState = {
  isUploading: false,
  isLoading: false,
  isFetching: false,
  postFail: '',
  postSuccess: '',
  fetchFailureMessage: '',
  fetchSuccessMessage: '',
  submissions: '',
};

const submissions = (state=initialState, action)=>{
  switch(action.type){
  case POST_SUBMISSION:
    return {
      ...state, isUploading: true
    };
  case POST_SUBMISSION_SUCCESS:
    return {
      ...state, postSuccess: action.message,
      successStatus: action.success
    };
  case POST_SUBMISSION_FAILURE:
    return {
      ...state, postFail: true,
      error: action.error,
      successStatus: false
    };
  case FETCH_SUBMISSION:
    return {
      ...state, isFetching: true, isLoading: true
    };
  case FETCH_SUBMISSION_SUCCESS:
    return {
      ...state, fetchSuccessMessage: action.message,
      submissions: action.submissions, isFetching: false
    };
  case FETCH_SUBMISSION_FAILURE:
    return {
      ...state, error: action.error, isFetching: false,
      fetchFailureMessage: '', submissions: 'failed'
    };
  default:
    return state;
  }
};

export default submissions;
