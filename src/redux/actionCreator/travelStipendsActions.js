import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE
} from '../constants/actionTypes';

export const fetchAllTravelStipends = action => {
  return {
    type: FETCH_ALL_TRAVEL_STIPENDS,
    action
  };
};

export const fetchAllTravelStipendsSuccess = ({ stipends }) => ({
  type: FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  stipends
});

export const fetchAllTravelStipendsFailure = error => ({
  type: FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  error
});
