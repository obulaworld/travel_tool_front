import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_TRIPS,
  UPDATE_TRIP,
} from '../constants/actionTypes';
import TripsAPI from '../../services/TripsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchTrips,
  fetchTripsSuccess,
  fetchTripsFailure,
  updateTrip,
  updateTripSuccess,
  updateTripFailure
} from '../actionCreator/tripActions';

export function* fetchTripsSaga() {
  let response;
  try {
    response = yield call(TripsAPI.getTrips);
    yield put(fetchTripsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchTripsFailure(errorMessage));
  }
}

export function* watchFetchTrips() {
  yield takeLatest(FETCH_TRIPS, fetchTripsSaga);
}

export function* updateTripSaga(action) {
  try {
    const response = yield call(TripsAPI.updateTrip, action.tripId, action.tripData);
    yield put(updateTripSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateTripFailure(errorMessage));
  }
}

export function* watchUpdateTrip() {
  yield takeLatest(UPDATE_TRIP, updateTripSaga);
}
