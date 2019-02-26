import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  DELETE_TRAVEL_STIPEND,
  DELETE_TRAVEL_STIPEND_SUCCESS,
  DELETE_TRAVEL_STIPEND_FAILURE,
  FETCH_SINGLE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND_SUCCESS,
  CREATE_TRAVEL_STIPEND_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  isDeleting: false,
  stipends: [],
  error: {},
  selectedStipend: {}
};


const deleteTravelStipend = (state = initialState, action) => {
  switch(action.type){
  case  FETCH_SINGLE_TRAVEL_STIPEND: {
    const { stipends } = state;
    return {
      ...state,
      selectedStipend: stipends.find(stipend => stipend.id === action.stipendId) || {},
    };
  }
  case DELETE_TRAVEL_STIPEND:
    return{
      ...state,
      isDeleting: true
    };
  case DELETE_TRAVEL_STIPEND_SUCCESS: {
    const stipends = state.stipends.filter(stipend =>
      stipend.id !== action.stipendId);
    return {
      ...state,
      isDeleting: false,
      stipends: stipends,
    };
  }
  case DELETE_TRAVEL_STIPEND_FAILURE:
    return {
      ...state,
      isDeleting: false,
      error: action.error
    };
  default: { return state;}
  }
};

const travelStipends = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_TRAVEL_STIPENDS:
    return {...state, isLoading: true};
  case FETCH_ALL_TRAVEL_STIPENDS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      stipends: action.stipends
    };
  case FETCH_ALL_TRAVEL_STIPENDS_FAILURE:
    return {...state, isLoading: false, error: action.error};

  case CREATE_TRAVEL_STIPEND:
    return {...state, isLoading: true};
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
  default:
    return deleteTravelStipend(state,action);
  }
};


export default travelStipends;

