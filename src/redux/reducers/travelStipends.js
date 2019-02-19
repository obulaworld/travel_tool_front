import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  stipends: [],
  error: {}
};

const listAllTravelStipends = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_TRAVEL_STIPENDS:
    return { ...state, isLoading: true };
  case FETCH_ALL_TRAVEL_STIPENDS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      stipends: action.stipends
    };
  case FETCH_ALL_TRAVEL_STIPENDS_FAILURE:
    return { ...state, isLoading: false, error: action.error };
  default:
    return state;
  }
};

export default listAllTravelStipends;
