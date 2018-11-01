import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  departmentTrips: {
    loading: false,
    report: [],
    error: ''
  }
};

const analytics = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_DEPARTMENT_TRIPS_ANALYTICS: {
    return {
      ...state,
      departmentTrips: {
        ...state.departmentTrips,
        loading: true,
      }
    };
  }
  case FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS: {
    return {
      ...state,
      departmentTrips: {
        ...state.departmentTrips,
        loading: false,
        report: action.report
      }
    };
  }
  case FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE: {
    return {
      ...state,
      departmentTrips: {
        ...state.departmentTrips,
        loading: false,
        error: action.error
      }
    };
  }
  default: return state;
  }
};

export default analytics;
