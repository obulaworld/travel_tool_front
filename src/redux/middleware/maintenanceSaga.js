import toast from 'toastr';
import { put, takeLatest, call } from 'redux-saga/effects';
import { ADD_MAINTENANCE_RECORD } from '../constants/actionTypes';
import MaintainaceApi from '../../services/MaintainaceApi';
import maintenanceAction from '../actionCreator/maintenanceAction';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* AddMainteinanceSaga(action) {
  try {
    const response = yield call(MaintainaceApi.addMaintainanceRecord, action.data, action.roomId);
    const message = response.data.message;
    toast.success(message);
  } catch (error) { /* istanbul ignore next */
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    return error;
  }
}

export function* watchAddMainteinanceAsync() {
  yield takeLatest(ADD_MAINTENANCE_RECORD, AddMainteinanceSaga);
}


