import {
  CREATE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE,
  VIEW_TRAVEL_REASON_DETAILS,
  VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
  VIEW_TRAVEL_REASON_DETAILS_FAILURE,
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

export const viewTravelDetails = (id) => ({
  type: VIEW_TRAVEL_REASON_DETAILS,
  id,
});

export const viewTravelDetailsSuccess = (response) => ({
  type: VIEW_TRAVEL_REASON_DETAILS_SUCCESS,
  response
});

export const viewTravelDetailsFailure = (error) => ({
  type: VIEW_TRAVEL_REASON_DETAILS_FAILURE,
  error
});
