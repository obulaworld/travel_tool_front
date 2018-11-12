import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { POST_SUBMISSION, FETCH_SUBMISSION } from '../constants/actionTypes';
import SubmissionAPI from '../../services/checklistSubmissionAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  postSubmissionSuccess,
  postSubmissionFailure,
  fetchSubmissionSuccess,
  fetchSubmissionFailure
} from '../actionCreator/checkListSubmissionActions';

export function* watchPostSubmission() {
  yield takeLatest(POST_SUBMISSION, postSubmissionSaga);
}

export function* postSubmissionSaga(action) {
  try {
    const response = yield call(SubmissionAPI.postSubmission, action.formData, action.checklistId);
    yield put(postSubmissionSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(postSubmissionFailure(errorMessage));
  }
}

export function* watchFetchSubmission() {
  yield takeEvery(FETCH_SUBMISSION, fetchSubmissionSaga);
}
  
export function* fetchSubmissionSaga(action) {
  try {
    const response = yield call(SubmissionAPI.getSubmission, `${action.requestId}`);
    yield put(fetchSubmissionSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchSubmissionFailure(errorMessage));
  }
}
