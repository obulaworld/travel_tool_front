import {
  CREATE_ACCOMMODATION_DATA,
  CREATE_ACCOMMODATION_DATA_SUCCESS,
  CREATE_ACCOMMODATION_DATA_FAILURE,
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  INIT_FETCH_TIMELINE_DATA,
  FETCH_TIMELINE_DATA_SUCCESS,
  FETCH_TIMELINE_DATA_FAILURE
} from '../constants/actionTypes';

const initialState = {
  postAccommodationData: [],
  errors: [],
  guestHouses: [],
  guestHouse: {
    rooms: []
  },
  isLoading: false
};

const accommodation = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_ACCOMMODATION_DATA:
    return { ...state };
  case CREATE_ACCOMMODATION_DATA_SUCCESS:
    return { ...state, postAccommodationData: action.accommodationData, };
  case CREATE_ACCOMMODATION_DATA_FAILURE:
    return { ...state, errors: action.error };
  case FETCH_ACCOMMODATION_CENTRES:
    return { ...state, isLoading: true };
  case FETCH_ACCOMMODATION_CENTRES_SUCCESS:
    return {
      ...state, isLoading: false, guestHouses: action.guestHouses
    };
  case FETCH_ACCOMMODATION_CENTRES_FAILURE:
    return {  ...state, isLoading: false, guestHouses: null,
      accommodationError: action.error
    };
  case INIT_FETCH_TIMELINE_DATA:
    return { ...state, isLoading: true};
  case FETCH_TIMELINE_DATA_SUCCESS:
    return guestHouseTimelineDataSuccessState(state, action);
  case FETCH_TIMELINE_DATA_FAILURE:
    return guestHouseTimelineDataFailureState(state, action);
  default:
    return state;
  }
};

const guestHouseTimelineDataSuccessState = (state, successAction) => ({
  ...state,
  isLoading: false,
  guestHouse: successAction.guestHouse
});

const guestHouseTimelineDataFailureState = (state, failureAction) => ({
  ...state,
  isLoading: false,
  guestHouse: failureAction.guestHouse,
  error: failureAction.error
});

export default accommodation;
