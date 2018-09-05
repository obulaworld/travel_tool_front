import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import UserAPI from '../../services/UserAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  postUserData,
  postUserDataSuccess,
  postUserDataFailure,
  getUserData,
  getUserDataSuccess,
  getUserDataFailure,
} from '../actionCreator/userActions';

export function* watchPostUserDataSagaAsync() {
  yield takeLatest(postUserData().type, postUserDataSagaAsync);
}

export function* postUserDataSagaAsync(action) {
  try {
    const response = yield call(UserAPI.postNewUsers, action.userData);
    yield put(postUserDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postUserDataFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchGetUserDataSagaAsync() {
  yield takeLatest(getUserData().type, fetchUserDataSaga);
}
let response;
export function* fetchUserDataSaga(action) {
  try {
    response = yield call(UserAPI.getUserData, action.id);
    yield put(getUserDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getUserDataFailure(errorMessage));
  }
}
