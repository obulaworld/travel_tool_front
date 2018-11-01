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
  putRoleDataFailure,
  addRole,
  addRoleFailure,
  addRoleSuccess
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
    toast.success(`User has been added as a
      ${action.roleData.roleName.toLowerCase()}`);
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

export function* watchAddRoleSaga() {
  yield takeLatest(addRole().type, addRoleSaga);
}
export function* addRoleSaga(action) {
  try {
    const { roleData } = action;
    const response = yield call(RoleAPI.addRole, roleData);
    yield put(addRoleSuccess(response.data.result));
    yield put(closeModal());
    toast.success('Role created successfully');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(addRoleFailure(errorMessage));
    toast.error(errorMessage);
  }
}
