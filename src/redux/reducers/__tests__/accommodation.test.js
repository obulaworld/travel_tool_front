import accommodation from '../accommodation';
import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
} from '../../constants/actionTypes';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

describe('Accommodation Reducer', () => {
  describe('Fetch Accommodation Reducer', () => {
    const initialState = {
      postAccommodationData: [],
      errors: [],
      guestHouses: [],
      guestHouse: {
        rooms: []
      },
      isLoading: false
    };
    const error = 'Error fetching accommodation centres, network error';
    it('returns the correct initial state', () => {
      expect(accommodation(undefined, {})).toEqual({
        ...initialState
      });
    });

    it(`returns the correct state for FETCH_ACCOMMODATION_CENTRES
    action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it(`returns the correct state for
    FETCH_ACCOMMODATION_CENTRES_SUCCESS action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
        guestHouses
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        guestHouses
      });
    });

    it(`returns the correct state for
    FETCH_ACCOMMODATION_CENTRES_FAILURE action`, () => {
      const action = {
        type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
        error
      };
      expect(accommodation(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        accommodationError: error,
        guestHouses: null
      });
    });
  });
});
