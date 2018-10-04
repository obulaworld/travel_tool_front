import {
  UPDATE_TRIP,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE,
  FETCH_TRIPS,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE
} from '../constants/actionTypes';

export const updateTrip = ({tripId, tripData}) => ({
  type: UPDATE_TRIP,
  tripId,
  tripData
});

export const updateTripSuccess = ({trip, message, success}) => ({
  type: UPDATE_TRIP_SUCCESS,
  trip,
  message,
  success
});

export const updateTripFailure = (error) => ({
  type: UPDATE_TRIP_FAILURE,
  error
});

export const fetchTrips = () => ({
  type: FETCH_TRIPS
});

export const fetchTripsSuccess = ({trips, message, success}) => ({
  type: FETCH_TRIPS_SUCCESS,
  trips,
  message,
  success
});

export const fetchTripsFailure = (error) => ({
  type: FETCH_TRIPS_FAILURE,
  error
});
