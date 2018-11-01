import travelCalendarReducer from '../travelCalendar';
import {
  FETCH_CALENDAR_ANALYTICS,
  FETCH_CALENDAR_ANALYTICS_SUCCESS,
  FETCH_CALENDAR_ANALYTICS_FAILURE
} from '../../constants/actionTypes';
import { fetchTravelCalendarResponse } from '../../__mocks__/mocks'



describe('Travel Calendar Reducer', ()=>{
  const initialState = {};

  it('should return empty object as initial state', () => {
    expect(travelCalendarReducer(undefined, {})).toEqual(initialState);
  });

  it('should update state isLoading to true FETCH_CALENDAR_ANALYTICS', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should return FETCH_CALENDAR_ANALYTICS_SUCCESS', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS_SUCCESS,
      data: fetchTravelCalendarResponse
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      travelCalendarData: fetchTravelCalendarResponse
    });
  });

  it('should return FETCH_CALENDAR_ANALYTICS_FAILURE', () => {
    const action = {
      type: FETCH_CALENDAR_ANALYTICS_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    expect(travelCalendarReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      travelCalendarError: 'Possible network error, please reload the page'
    });
  });
});