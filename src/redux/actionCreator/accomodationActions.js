import {
  INIT_FETCH_TIMELINE_DATA,
  FETCH_TIMELINE_DATA_SUCCESS
} from '../constants/actionTypes';

export const initFetchTimelineData = (guestHouseId, startDate, endDate) => ({
  type: INIT_FETCH_TIMELINE_DATA,
  guestHouseId,
  startDate,
  endDate
});

export const fetchTimelineDataSuccess = (guestHouse) => ({
  type: FETCH_TIMELINE_DATA_SUCCESS,
  guestHouse
});

export const fetchTimelineDataFailure = (errorMsg) => ({
  type: FETCH_TIMELINE_DATA_SUCCESS,
  guestHouse: {rooms: [] },
  error: errorMsg
});
