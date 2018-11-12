import {
  POST_SUBMISSION,
  POST_SUBMISSION_SUCCESS,
  POST_SUBMISSION_FAILURE,
  FETCH_SUBMISSION,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE,
} from '../constants/actionTypes';
  
export const postSubmission = ({ formData, checklistId }) => ({
  type: POST_SUBMISSION,
  formData,
  checklistId
});
  
export const postSubmissionSuccess = ({submission, message, success}) => ({
  type: POST_SUBMISSION_SUCCESS,
  submission,
  message,
  success
});
  
export const postSubmissionFailure = (error) => ({
  type: POST_SUBMISSION_FAILURE,
  error
});

export const fetchSubmission = ({ requestId }) => ({
  type: FETCH_SUBMISSION,
  requestId
});
    
export const fetchSubmissionSuccess = ({submissions, message, success}) => ({
  type: FETCH_SUBMISSION_SUCCESS,
  submissions,
  message,
  success
});
    
export const fetchSubmissionFailure = (error) => ({
  type: FETCH_SUBMISSION_FAILURE,
  error
});
