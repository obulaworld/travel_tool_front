import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_ACCOMMODATION_CENTRES,
} from '../constants/actionTypes';
import AccommodationAPI from '../../services/AccommodationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
} from '../actionCreator/accommodationActions';

export function* fetchAccommodationSaga() {
  try {
    const response = yield call(
      AccommodationAPI.getAccommodationCentres
    );
    const { data } = response;
    yield put(fetchAccommodationSuccess(data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchAccommodationFailure(errorMessage));
  }
}


export function* watchFetchAccommodation() {
  yield takeLatest(
    FETCH_ACCOMMODATION_CENTRES,
    fetchAccommodationSaga);
}
