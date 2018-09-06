import {takeLatest, put, call} from 'redux-saga/effects';
import ApprovalsApi from '../../services/approvalsAPI';
import {
  fetchUserApprovals,
  fetchUserApprovalsSuccess,
  fetchUserApprovalsFailure
} from '../actionCreator';

export function* fetchUserApprovalsSaga(action) {
  try {
    const approvals = yield call(ApprovalsApi.getUserApprovals, action.url);
    yield put(fetchUserApprovalsSuccess(approvals.data));
  } catch (error) {
    yield put(fetchUserApprovalsFailure(error));
  }
}

export function* watchFetchApprovals() {
  yield takeLatest(fetchUserApprovals().type, fetchUserApprovalsSaga);
}
