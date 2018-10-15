import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { fetchOccupationsResponse } from '../../__mocks__/mocks';
import { watchFetchOccupations } from '../occupationSaga';
import OccupationAPI from '../../../services/OccupationAPI';

const errorResponse = {
  response: {
    data: {
      error: 'Possible network error, please reload the page'
    }
  }
};
const error = {
  error: 'Possible network error, please reload the page'
};

describe('occupations saga', () => {
  it('fetches occupations from API', () => {
    return expectSaga(watchFetchOccupations, OccupationAPI)
      .provide([
        [call(OccupationAPI.getOccupationData), fetchOccupationsResponse]
      ])
      .put({
        type: 'FETCH_OCCUPATIONS_SUCCESS',
        occupations: fetchOccupationsResponse.data.occupations
      })
      .dispatch({
        type: 'FETCH_OCCUPATIONS'
      })
      .run();
  }
  );
});
