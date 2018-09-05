import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import RoleAPI from '../../services/RoleAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  getRoleData,
  getRoleDataSuccess,
  getRoleDataFailure,
  putRoleData,
  putRoleDataSuccess,
  putRoleDataFailure
} from '../actionCreator/roleActions';
import { closeModal } from '../actionCreator/modalActions';

export function* watchPutRoleDataSagaAsync() {
  yield takeLatest(putRoleData().type, putURoleDataSagaAsync);
}

export function* putURoleDataSagaAsync(action) {
  try {
    const response = yield call(RoleAPI.putData, action.roleData);
    yield put(putRoleDataSuccess(response.data));
    yield put(closeModal());
    toast.success('User role updated');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(putRoleDataFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchGetRoleDataSagaAsync() {
  yield takeLatest(getRoleData().type, getRoleDataSaga);
}

export function* getRoleDataSaga() {
  try {
    const response = yield call(RoleAPI.getRoleData);
    yield put(getRoleDataSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getRoleDataFailure(errorMessage));
  }
}
