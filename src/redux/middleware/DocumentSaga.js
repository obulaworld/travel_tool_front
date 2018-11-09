import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';

import { FETCH_DOCUMENTS } from '../constants/actionTypes';
import DocumentAPI from '../../services/DocumentAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
} from '../actionCreator/documentActions';

export function* fetchDocumentsAsync(action) {
  try{
    const response = yield call(DocumentAPI.fetchDocuments);
    yield put(fetchDocumentsSuccess(response.data));
  }
  catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchDocumentsFailure(errorMessage));
  }
}

export function* watchFetchDocuments() {
  yield takeLatest(FETCH_DOCUMENTS, fetchDocumentsAsync);
}
