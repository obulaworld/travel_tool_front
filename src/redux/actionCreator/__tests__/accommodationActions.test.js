import {
  FETCH_ACCOMMODATION_CENTRES,
  FETCH_ACCOMMODATION_CENTRES_SUCCESS,
  FETCH_ACCOMMODATION_CENTRES_FAILURE,
} from '../../constants/actionTypes';

import {
  fetchAccommodation,
  fetchAccommodationSuccess,
  fetchAccommodationFailure
} from '../accommodationActions';

import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

describe('Accommodation actions test', () => {
  describe('Fetch Accommodation actions', () => {
    it('should return action of type FETCH_ACCOMMODATION_CENTRES', () => {
      const expectedAction = {
        type: FETCH_ACCOMMODATION_CENTRES,
      };

      const newAction = fetchAccommodation();

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type FETCH_ACCOMMODATION_CENTRES_FALIURE',
      () => {
        const error = 'Server error, please try again';
        const expectedAction = {
          type: FETCH_ACCOMMODATION_CENTRES_FAILURE,
          error
        };

        const newAction = fetchAccommodationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type FETCH_ACCOMMODATION_CENTRES_SUCCESS',
      () => {
        const response = {
          data: {
            success: true,
            message: 'Successfully retrieved guestHouses',
            guestHouses,
          }
        };
        const expectedAction = {
          type: FETCH_ACCOMMODATION_CENTRES_SUCCESS,
          guestHouses
        };

        const newAction = fetchAccommodationSuccess(response.data);
        expect(newAction).toEqual(expectedAction);
      });
  });
});
