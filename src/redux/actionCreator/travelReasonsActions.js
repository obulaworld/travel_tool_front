import {
  CREATE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE
} from '../constants/actionTypes';

export const createTravelReason = (body, history) => ({
  type: CREATE_TRAVEL_REASON,
  body,
  history
});

export const createTravelReasonSuccess = (response) => ({
  type: CREATE_TRAVEL_REASON_SUCCESS,
  response
});

export const createTravelReasonFailure = (error) => ({
  type: CREATE_TRAVEL_REASON_FAILURE,
  error
});
