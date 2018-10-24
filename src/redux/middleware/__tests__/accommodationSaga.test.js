import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import AccommodationAPI from '../../../services/AccommodationAPI';
import {
  watchFetchAccommodation,
  watchEditAccommodation
} from '../accommodationSaga';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

const response = {
  data: {
    guestHouses,
    success: true,
    message: 'Successfully retrieved guestHouses'
  }
};
const error = 'Possible network error, please reload the page';

describe('Accommodation Saga', () => {
  describe('Fetch Accommodation saga', () => {
    it('fetches accommodation centres', () => {
      return expectSaga(watchFetchAccommodation, AccommodationAPI)
        .provide([[call(AccommodationAPI.getAccommodationCentres), response]])
        .put({
          type: 'FETCH_ACCOMMODATION_CENTRES_SUCCESS',
          guestHouses: response.data.guestHouses
        })
        .dispatch({
          type: 'FETCH_ACCOMMODATION_CENTRES'
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchFetchAccommodation, AccommodationAPI)
        .provide([
          [call(AccommodationAPI.getAccommodationCentres), throwError(error)]
        ])
        .put({
          type: 'FETCH_ACCOMMODATION_CENTRES_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_ACCOMMODATION_CENTRES'
        })
        .run();
    });
  });
});
