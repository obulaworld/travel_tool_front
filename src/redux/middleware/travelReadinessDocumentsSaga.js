/* eslint-disable import/prefer-default-export */
import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import TravelReadinessDocumentsAPI from '../../services/TravelReadinessDocumentsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import * as actions from '../actionCreator/travelReadinessDocumentsActions';

export function* fetchUsersReadinessDocumentsAsync() {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getAllUsersReadiness);
    yield put(actions.fetchAllUsersReadinessDocumentsSuccess(response.data.users));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchAllUsersReadinessDocumentsFailure(errorMessage));
  }
}

export function* watchFetchUsersReadinessDocuments() {
  yield takeLatest(types.FETCH_ALL_USERS_READINESS_DOCUMENTS, fetchUsersReadinessDocumentsAsync);
}

export function* fetchReadinessDocumentsAsync(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getUserReadiness, action.userId);
    yield put(actions.fetchUserReadinessDocumentsSuccess(response.data.user));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchUserReadinessDocumentsFailure(errorMessage));
  }
}

export function* watchFetchReadinessDocuments() {
  yield takeLatest(types.FETCH_USER_READINESS_DOCUMENTS, fetchReadinessDocumentsAsync);
}

export function* fetchReadinessDocumentDetailsAsync(action) {
  try {
    const response = yield call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, action.documentId);
    yield put(actions.fetchTravelReadinessDocumentSuccess(response.data.document));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(actions.fetchTravelReadinessDocumentFailure(errorMessage));
  }
}

export function* watchFetchReadinessDocumentDetails() {
  yield takeLatest(types.FETCH_TRAVEL_READINESS_DOCUMENT, fetchReadinessDocumentDetailsAsync);
}
