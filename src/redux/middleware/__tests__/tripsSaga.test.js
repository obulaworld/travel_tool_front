import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import TripsAPI from '../../../services/TripsAPI';
import {
  watchFetchTrips,
  watchUpdateTrip
} from '../tripsSaga';
import {
  tripsResponse,
  updateTripResponse
} from '../../__mocks__/mocks';
import {
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
  UPDATE_TRIP,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE
} from '../../constants/actionTypes';

const error = 'Possible network error, please reload the page';
const fetchResponse = {
  data: tripsResponse
};
const updateResponse = {
  data: updateTripResponse
};

describe('Test suite for Trips Saga', () => {
  describe('Tests for trips fetch requests', () => {
    it('fetches trips successfully', () => {
      return expectSaga(watchFetchTrips, TripsAPI)
        .provide([
          [call(TripsAPI.getTrips), fetchResponse]
        ])
        .put({
          type: FETCH_TRIPS_SUCCESS,
          trips: fetchResponse.data.trips,
          message: fetchResponse.data.message,
          success: fetchResponse.data.success
        })
        .dispatch({
          type: FETCH_TRIPS
        })
        .run();
    });

    it('should throw an error if an error occurred while fetching trips', () => {
      return expectSaga(watchFetchTrips, TripsAPI)
        .provide([
          [call(TripsAPI.getTrips), throwError(error)]
        ])
        .put({
          type: FETCH_TRIPS_FAILURE,
          error
        })
        .dispatch({
          type: FETCH_TRIPS
        })
        .run();
    });
  });

  describe('Test suite for trip update requests', () => {
    const action = {
      tripId: 3,
      tripData: {
        checkType: 'checkIn'
      }
    };
    it('should return updated trip if update request was successful', () => {
      return expectSaga(watchUpdateTrip, TripsAPI)
        .provide([
          [call(TripsAPI.updateTrip, action.tripId, action.tripData), updateResponse]
        ])
        .put({
          type: UPDATE_TRIP_SUCCESS,
          trip: updateTripResponse.trip,
          message: updateTripResponse.message,
          success: updateTripResponse.success
        })
        .dispatch({
          type: UPDATE_TRIP,
          tripId: action.tripId,
          tripData: action.tripData
        })
        .run();
    });

    it('should throw an error if update fails', () => {
      const error = {
        response: {
          me: 'Clinton is foolish',
          status: 422,
          data: {
            errors: [{msg: 'checkType must be "checkIn" or "checkOut"'}]
          }
        }
      };
      return expectSaga(watchUpdateTrip, TripsAPI)
        .provide([
          [call(TripsAPI.updateTrip, action.tripId, action.tripData), throwError(error)]
        ])
        .put({
          type: UPDATE_TRIP_FAILURE,
          error: 'Bad request. checkType must be "checkIn" or "checkOut"'
        })
        .dispatch({
          type: UPDATE_TRIP,
          tripId: action.tripId,
          tripData: action.tripData
        })
        .run();
    });
  });
});
