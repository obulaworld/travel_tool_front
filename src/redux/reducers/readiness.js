import { FETCH_TRAVEL_READINESS, FETCH_TRAVEL_READINESS_FAILURE,
  FETCH_TRAVEL_READINESS_SUCCESS } from '../constants/actionTypes';

const initialState = { 
  readiness: {}, 
  isLoading:false, 
  error: {} 
};

const readiness = (state = initialState, action) => {
  const { response, error, type} = action;
  switch(type){
  case FETCH_TRAVEL_READINESS:
    return {...state, isLoading: true};
  case FETCH_TRAVEL_READINESS_SUCCESS:
    return { ...state, readiness: response, isLoading: false, error: {} };
  case FETCH_TRAVEL_READINESS_FAILURE:
    return { ...state, error, isLoading: false, readiness: {} };

  default: return state;
  }
};
export default readiness;
