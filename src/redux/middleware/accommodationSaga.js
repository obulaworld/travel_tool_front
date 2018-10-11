import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import AccommodationAPI from '../../services/AccommodationAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createAccommodation,
  createAccommodationSuccess,
  createAccommodationFailure,
  initFetchTimelineData,
  fetchTimelineDataSuccess,
  fetchTimelineDataFailure,
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
  editAccommodationSuccess,
  editAccommodationFailure,
} from '../actionCreator/accommodationActions';
import { closeModal } from '../actionCreator/modalActions';

import {
  FETCH_ACCOMMODATION_CENTRES, EDIT_ACCOMMODATION_DATA
} from '../constants/actionTypes';



export function* watchCreateAccommodationSagaAsync() {
  yield takeLatest(createAccommodation().type, accommodationSagaAsync);
}
let response;
export function* accommodationSagaAsync(action) {
  try {
    response = yield call(AccommodationAPI.postAccommodation, action.accommodationData);
    yield put(createAccommodationSuccess(response.data));
    yield put(closeModal());
    toast.success('Guest House added');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createAccommodationFailure(errorMessage));
    toast.error(errorMessage);
  }
}


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

export function* editAccommodationAsync(action) {
  try {
    const { guestHouseId, guestHouseData} = action;
    const response = yield call(AccommodationAPI.editAccommodation, guestHouseData, guestHouseId);
    yield put(editAccommodationSuccess(response.data.guestHouse));
    yield put(closeModal());
    toast.success('Guest House Updated Successfully');
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    yield put(editAccommodationFailure(errorMessage));
  }
}

export function* watchEditAccommodation() {
  yield takeLatest(EDIT_ACCOMMODATION_DATA, editAccommodationAsync);
}
