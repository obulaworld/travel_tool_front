import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE
} from '../constants/actionTypes';

export const fetchAccommodation = () => ({
  type: FETCH_ACCOMMODATION_CENTRES,
});

export const fetchAccommodationSuccess = ({guestHouses}) => ({
  type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  guestHouses,
});

export const fetchAccommodationFailure = (error) => ({
  type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
  error
});

