import {
  FETCH_ALL_TRAVEL_REASONS,
  FETCH_ALL_TRAVEL_REASONS_FAILURE,
  FETCH_ALL_TRAVEL_REASONS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  errors: {},
  travelReasons: [],
  pagination: {},
  isLoading: false
};

const listTravelReasons = (state=initialState, action) => {
  switch(action.type){
  case FETCH_ALL_TRAVEL_REASONS:
    return {...state, isLoading: true};
  case FETCH_ALL_TRAVEL_REASONS_SUCCESS:
    return {
      ...state,
      travelReasons: action.travelReasons,
      pagination: action.pagination,
      isLoading: false
    };
  case FETCH_ALL_TRAVEL_REASONS_FAILURE:
    return {
      ...state,
      errors: action.errors,
      isLoading: false
    };
  default:
    return state;
  }
};

export default listTravelReasons;
