import { put, takeLatest, call } from 'redux-saga/effects';
import RequestAPI from '../../services/RequestAPI';
import {
  fetchUserRequestsSuccess,
  fetchUserRequestsFailure,
} from '../actionCreator/requestActions';
import { FETCH_USER_REQUESTS } from '../constants/actionTypes';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUserRequestsSaga(action) {
  try {
    const response = yield call(RequestAPI.getUserRequests, action.url);
    yield put(fetchUserRequestsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserRequestsFailure(errorMessage));
  }
}

export function* watchFetchRequests() {
  yield takeLatest(FETCH_USER_REQUESTS, fetchUserRequestsSaga);
}
