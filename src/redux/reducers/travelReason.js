import {
  CREATE_TRAVEL_REASON,
  CREATE_TRAVEL_REASON_SUCCESS,
  CREATE_TRAVEL_REASON_FAILURE,
  FETCH_ALL_TRAVEL_REASONS,
  FETCH_ALL_TRAVEL_REASONS_FAILURE,
  FETCH_ALL_TRAVEL_REASONS_SUCCESS
} from '../constants/actionTypes';

export const initialState = {
  newReason: {},
  isCreating: false,
  errors: {},
  travelReasons: [],
  pagination: {},
  isLoading: false
};

const travelReason = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_TRAVEL_REASON: { return { ...state, isCreating: true, errors: {} }; }
  case CREATE_TRAVEL_REASON_SUCCESS:
  {
    return {
      ...state, isCreating: false, newReason: action.response.travelReason, errors: {}
    };}
  case CREATE_TRAVEL_REASON_FAILURE: {
    return { ...state, isCreating: false, errors: action.error };
  }
  case FETCH_ALL_TRAVEL_REASONS: return { ...state, isLoading: true };
  case FETCH_ALL_TRAVEL_REASONS_SUCCESS:
    return {
      ...state,
      travelReasons: action.travelReasons,
      pagination: action.pagination,
      isLoading: false
    };
  case FETCH_ALL_TRAVEL_REASONS_FAILURE:
    return { ...state, errors: action.errors, isLoading: false };
  default: return state;
  }
};

export default travelReason;
