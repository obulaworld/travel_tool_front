import { FETCH_TRAVEL_READINESS,
  FETCH_TRAVEL_READINESS_SUCCESS, FETCH_TRAVEL_READINESS_FAILURE} from '../constants/actionTypes';

export const fetchReadiness = (query) => ({
  type: FETCH_TRAVEL_READINESS,
  query
});

export const fetchReadinessSuccess = (response) => ({
  type:FETCH_TRAVEL_READINESS_SUCCESS,
  response,
});

export const fetchReadinessfailure = (error) => ({
  type: FETCH_TRAVEL_READINESS_FAILURE,
  error
});
