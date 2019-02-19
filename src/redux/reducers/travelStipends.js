import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  CREATE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND_SUCCESS,
  CREATE_TRAVEL_STIPEND_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  stipends: [],
  travelStipend: {},
  error: {}
};

const travelStipends = (state = initialState, action) => {
  switch(action.type) {
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

  case CREATE_TRAVEL_STIPEND:
    return { ...state, isLoading: true };
  case CREATE_TRAVEL_STIPEND_SUCCESS:
    return {
      ...state,
      travelStipend: action.newStipend,
      error: '',
      isLoading: false
    };
  case CREATE_TRAVEL_STIPEND_FAILURE:
    return {
      ...state,
      travelStipend: {},
      error: action.error,
      isLoading: false
    };
  default: return state;
  }
};
  
export default travelStipends;
  
