import analytics from '../analytics';
import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
} from '../../constants/actionTypes';
import {
  fetchDepartmentsTripsResponse
} from '../../__mocks__/mocks';

describe('Test suite for Analytics reducer', () => {
  const initialState = {
    departmentTrips: {
      loading: false,
      report: [],
      error: ''
    }
  };
  describe('Test suite for Department Trips Analytics', () => {
    it('should return initial state', () => {
      expect(analytics(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('should return loading state for FETCH_DEPARTMENT_TRIPS_ANALYTICS', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: true,
        }
      });
    });

    it('should update state with payload for FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
        report: fetchDepartmentsTripsResponse.data,
        success: fetchDepartmentsTripsResponse.success
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: false,
          report: action.report,
        }
      });
    });

    it('should update state with error message for FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE', () => {
      const action = {
        type: FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE,
        error: 'An error occurred'
      };
      expect(analytics(initialState, action)).toEqual({
        ...initialState,
        departmentTrips: {
          ...initialState.departmentTrips,
          loading: false,
          error: action.error,
        }
      });
    });
  });
});
