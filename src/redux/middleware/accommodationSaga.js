import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_ACCOMMODATION_CENTRES,
} from '../constants/actionTypes';
import AccommodationAPI from '../../services/AccommodationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  initFetchTimelineData,
  fetchTimelineDataSuccess,
  fetchTimelineDataFailure,
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
} from '../actionCreator';

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

export function * fetchGuestHouseTimelineDataSaga(action) {
  try {
    const {guestHouseId, startDate, endDate} = action;
    const fetchTimelineData = AccommodationAPI.fetchTimelineData;
    const response = yield call(fetchTimelineData, guestHouseId, startDate, endDate);
    yield put(fetchTimelineDataSuccess(response.data.guestHouse));
  } catch (e) {
    const errorMessage = apiErrorHandler(e);
    yield put(fetchTimelineDataFailure(errorMessage));
  }
}

export function* watchFetchTimelneData() {
  yield takeLatest(initFetchTimelineData().type, fetchGuestHouseTimelineDataSaga);
}
