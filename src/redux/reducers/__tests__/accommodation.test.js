import accommodation from '../accommodation';
import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
  EDIT_ACCOMMODATION_DATA,
  EDIT_ACCOMMODATION_DATA_SUCCESS,
  EDIT_ACCOMMODATION_DATA_FAILURE,
} from '../../constants/actionTypes';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

describe('Accommodation Reducer', () => {
  describe('Fetch Accommodation Reducer', () => {
    const initialState = {
      postAccommodationData: [],
      errors: [],
      editAccommodationData: {},
      editingAccommodation: false,
      guestHouses: [],
      guestHouseData: {'guestHouse': {
        'houseName': 'Kololo heights',
        'location': 'Kampala',
        'bathRooms': '4',
        'imageUrl': 'https://www.lol.com',
        'rooms': [
          {
            'roomName': 'Rwenzori',
            'roomType': 'non-ensuite',
            'bedCount': '1',
            'id': 'dtnJtaRE7Y'
          }
        ]
      }
      },
      guestHouse: {
        rooms: []
      },
      isLoading: false
    };

    const error = 'Error fetching accommodation centres, network error';
    it('returns the correct initial state', () => {
      expect(accommodation(undefined, {})).toEqual({
        ...initialState,
        'guestHouseData': {}
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

    it('should handle EDIT_ACCOMMODATION_DATA', () => {
      const action = {
        type: EDIT_ACCOMMODATION_DATA,
        guestHouseData: { guestHouse: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        }
        }
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        postAccommodationData: [],
        errors: [],
        editAccommodationData: {},
        editingAccommodation: true,
        guestHouses: [],
        guestHouse: {
          rooms: []
        },
        guestHouseData: {'guestHouse': {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        }
        },
        isLoading: false
      };

      expect(newState).toEqual(expectedState);
    });

    it('should handle EDIT_ACCOMMODATION_DATA_SUCCESS', () => {
      const action = {
        type: EDIT_ACCOMMODATION_DATA_SUCCESS,
        guestHouseData: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        },
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        postAccommodationData: [],
        errors: [],
        editAccommodationData: {},
        editingAccommodation: false,
        guestHouses: [],
        guestHouse: {
          rooms: []
        },
        guestHouseData: {
          'houseName': 'Kololo heights',
          'location': 'Kampala',
          'bathRooms': '4',
          'imageUrl': 'https://www.lol.com',
          'rooms': [
            {
              'roomName': 'Rwenzori',
              'roomType': 'non-ensuite',
              'bedCount': '1',
              'id': 'dtnJtaRE7Y'
            }
          ]
        },
        isLoading: false,
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle EDIT_ACCOMMODATION_DATA_FAILURE', () => {
      const error = 'Failed to edit guest house';
      const action = {
        type: EDIT_ACCOMMODATION_DATA_FAILURE,
        error
      };

      const newState = accommodation(initialState, action);
      const expectedState = {
        editingAccommodation: false,
        error: 'Failed to edit guest house'
      };
      expect(newState).toMatchObject(expectedState);
    });

    it('returns the correct state for initFetchTimelineData', () => {
      const action = { type: 'INIT_FETCH_TIMELINE_DATA' };
      const expectedState = {
        ...initialState,
        isLoading: true
      };
      expect(accommodation(initialState, action)).toEqual(expectedState);
    });

    it('returns the correct state for fetchTimelineDataSuccess', () => {
      const successAction = {
        type: 'FETCH_TIMELINE_DATA_SUCCESS',
        guestHouse: {
          houseName: 'Mini Flat',
          rooms: []
        }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        guestHouse: successAction.guestHouse
      };
      expect(accommodation(initialState, successAction)).toEqual(expectedState);
    });

    it('returns the correct state for fetchTimelineDataFailure', () => {
      const failureAction = {
        type: 'FETCH_TIMELINE_DATA_FAILURE',
        error: 'Test error message',
        guestHouse: {
          rooms: []
        }
      };
      const expectedState = {
        ...initialState,
        isLoading: false,
        error: failureAction.error,
        guestHouse: failureAction.guestHouse
      };
      expect(accommodation(initialState, failureAction)).toEqual(expectedState);
    });
  });
});
