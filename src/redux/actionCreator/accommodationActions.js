import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
  INIT_FETCH_TIMELINE_DATA,
  FETCH_TIMELINE_DATA_SUCCESS,
  FETCH_TIMELINE_DATA_FAILURE,
  EDIT_ACCOMMODATION_DATA,
  EDIT_ACCOMMODATION_DATA_SUCCESS, 
  EDIT_ACCOMMODATION_DATA_FAILURE
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

export const createAccommodation  = accommodationData => ({
  type: CREATE_ACCOMMODATION_DATA,
  accommodationData
});

export const createAccommodationSuccess = accommodationData => ({
  type: CREATE_ACCOMMODATION_DATA_SUCCESS,
  accommodationData,
});

export const createAccommodationFailure = error => ({
  type: CREATE_ACCOMMODATION_DATA_FAILURE,
  error,
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

export const editAccommodation  = (guestHouseId, guestHouseData) => ({
  type: EDIT_ACCOMMODATION_DATA,
  guestHouseId,
  guestHouseData,
});

export const editAccommodationSuccess = guestHouseData => ({
  type: EDIT_ACCOMMODATION_DATA_SUCCESS,
  guestHouseData,
});

export const editAccommodationFailure = error => ({
  type: EDIT_ACCOMMODATION_DATA_FAILURE,
  error,
});
