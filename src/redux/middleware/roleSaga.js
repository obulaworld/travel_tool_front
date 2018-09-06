import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_ROLE_USERS } from '../constants/actionTypes';
import RoleAPI from '../../services/RoleAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchRoleUsersSuccess,
  fetchRoleUsersFailure
} from '../actionCreator/roleActions';

export function* watchFetchRoleUsers() {
  yield takeLatest(FETCH_ROLE_USERS, fetchRoleUsersSaga);
}
let response;
export function* fetchRoleUsersSaga(action) {
  try {
    response = yield call(RoleAPI.getRoleUsers, action.roleId);
    yield put(fetchRoleUsersSuccess(response.data.result));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchRoleUsersFailure(errorMessage));
  }
}
