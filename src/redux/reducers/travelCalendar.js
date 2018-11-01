import {
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS_FAILURE
} from '../constants/actionTypes';

const initialState = {};

const travelCalendar= (state = initialState, action) => {
  switch(action.type){
  case FETCH_CALENDAR_ANALYTICS:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_CALENDAR_ANALYTICS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      travelCalendarData: action.data,
    };
  case FETCH_CALENDAR_ANALYTICS_FAILURE:
    return {
      ...state,
      isLoading: false,
      travelCalendarError: action.error
    };
  default:
    return state;
  }
};

export default travelCalendar;
