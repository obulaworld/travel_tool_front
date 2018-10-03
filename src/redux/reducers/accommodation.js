import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
} from '../constants/actionTypes';


const accommodation = (state = {}, action) => {
  switch (action.type) {
  case FETCH_ACCOMMODATION_CENTRES:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ACCOMMODATION_CENTRES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      guestHouses: action.guestHouses
    };
  case FETCH_ACCOMMODATION_CENTRES_FAILURE:
    return {
      ...state,
      isLoading: false,
      guestHouses: null,
      accommodationError: action.error
    };
  default:
    return state;
  }
};

export default accommodation;
