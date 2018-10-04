import trips from '../trips';
import {
  UPDATE_TRIP,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE,
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE
} from '../../constants/actionTypes';
import {
  tripsResponse,
  updateTripResponse
} from '../../__mocks__/mocks';
import Utils from '../../../helper/Utils';

describe('Test suite for trips reducer', () => {
  describe('Fetch trips reducer', () => {
    const initialState = {
      trips: []
    };

    it('should return initial state', () => {
      expect(trips(undefined, {})).toEqual({
        ...initialState
      });
    });

    it('returns loading state for FETCH_TRIPS action', () => {
      const action = {
        type: FETCH_TRIPS
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('should update the state with response data for FETCH_TRIPS_SUCCESS', () => {
      const action = {
        type: FETCH_TRIPS_SUCCESS,
        trips: tripsResponse.trips,
        message: tripsResponse.message,
        success: tripsResponse.success
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        trips: tripsResponse.trips,
      });
    });

    it('should update state with error for FETCH_TRIPS_FAILURE', () => {
      const error = 'An error occurred while retrieving trips';
      const action = {
        type: FETCH_TRIPS_FAILURE,
        error,
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        tripError: error
      });
    });
  });

  describe('Update trips reducer', () => {
    const initialState = {
      trips: tripsResponse.trips
    };

    it('should return initial state if no action type exists', () => {
      expect(trips(initialState, {})).toEqual({
        ...initialState
      });
    });

    it('returns loading state for UPDATE_TRIPS action', () => {
      const action = {
        type: UPDATE_TRIP
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('should update the state with response data for UPDATE_TRIPS_SUCCESS ', () => {
      const action = {
        type: UPDATE_TRIP_SUCCESS,
        trip: updateTripResponse.trip
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        trips: tripsResponse.trips,
      });
    });

    it('should update state with error for UPDATE_TRIPS_FAILURE ', () => {
      const error = 'Update failed';
      const action = {
        type: UPDATE_TRIP_FAILURE,
        error,
      };
      expect(trips(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        tripError: error
      });
    });
  });
});
