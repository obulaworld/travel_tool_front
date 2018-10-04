import {
  updateTrip,
  updateTripSuccess,
  updateTripFailure,
  fetchTrips,
  fetchTripsSuccess,
  fetchTripsFailure
} from '../tripActions';
import { tripsResponse, updateTripResponse } from '../../__mocks__/mocks';

describe('Trip Actions', () => {
  describe('Fetch trips actions', () => {
    it('should return action type FETCH_TRIPS', () => {
      const expectedAction = {
        type: 'FETCH_TRIPS'
      };
      const createdAction = fetchTrips();
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_TRIPS_SUCCESS', () => {
      const expectedAction = {
        type: 'FETCH_TRIPS_SUCCESS',
        trips: tripsResponse.trips,
        message: tripsResponse.message,
        success: tripsResponse.success

      };
      const createdAction = fetchTripsSuccess(tripsResponse);
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type FETCH_TRIPS_FAILURE', () => {
      const error = 'Error fetching trips, network error';
      const expectedAction = {
        type: 'FETCH_TRIPS_FAILURE',
        error,

      };
      const createdAction = fetchTripsFailure(error);
      expect(createdAction).toEqual(expectedAction);
    });
  });

  describe('Update trips action', () => {
    it('should return action type UPDATE_TRIP', () => {
      const updateTripData = {
        tripId: 3,
        tripData: {
          checkType: 'checkIn'
        }
      };

      const receivedAction = {
        type: 'UPDATE_TRIP',
        tripId: updateTripData.tripId,
        tripData: updateTripData.tripData
      };
      const newAction = updateTrip(updateTripData);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type UPDATE_TRIP_SUCCESS', () => {
      const receivedAction = {
        type: 'UPDATE_TRIP_SUCCESS',
        trip: updateTripResponse.trip,
        message: updateTripResponse.message,
        success: updateTripResponse.success
      };
      const newAction = updateTripSuccess(updateTripResponse);
      expect(newAction).toEqual(receivedAction);
    });

    it('should return action type UPDATE_TRIP_FAILURE', () => {
      const error = 'Could not update trip status';

      const receivedAction = {
        type: 'UPDATE_TRIP_FAILURE',
        error,
      };
      const createdAction = updateTripFailure(error);
      expect(createdAction).toEqual(receivedAction);
    });
  });
});
