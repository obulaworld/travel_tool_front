import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  INIT_FETCH_TIMELINE_DATA,
  FETCH_TIMELINE_DATA_SUCCESS,
  FETCH_TIMELINE_DATA_FAILURE
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

export const initFetchTimelineData = (guestHouseId, startDate, endDate) => {
  return {
    type: INIT_FETCH_TIMELINE_DATA,
    guestHouseId,
    startDate,
    endDate
  };
};

export const fetchTimelineDataSuccess = (guestHouse) => ({
  type: FETCH_TIMELINE_DATA_SUCCESS,
  guestHouse
});

export const fetchTimelineDataFailure = (errorMsg) => ({
  type: FETCH_TIMELINE_DATA_FAILURE,
  guestHouse: {rooms: [] },
  error: errorMsg
});
