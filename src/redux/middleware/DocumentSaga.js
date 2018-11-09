import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { FETCH_DOCUMENTS, UPDATE_DOCUMENT, CREATE_DOCUMENT  } from '../constants/actionTypes';
import DocumentAPI from '../../services/DocumentAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  updateDocumentFailure,
  updateDocumentSuccess,
  createDocumentSuccessfully, 
  createDocumentFailure,
  fetchDocuments
} from '../actionCreator/documentActions';
import { closeModal } from '../actionCreator/modalActions';

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

export function* watchUpdateDocument() {
  yield takeLatest(UPDATE_DOCUMENT, updateDocumentAsync);
}

export function* updateDocumentAsync(action) {
  try {
    const { document: { id, name } } = action;
    const response = yield call(DocumentAPI.updateDocument, id, { name });
    yield put(updateDocumentSuccess(response.data));
    yield put(closeModal());
    toast.success(response.data.message);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}
export function* createDocumentSaga(action) {
  try {
    const response = yield call(DocumentAPI.postDocument, action.documentData);
    yield put(createDocumentSuccessfully(response.data));
    toast.success(response.data.message);
    yield put(closeModal());
    yield put(fetchDocuments());
  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createDocumentFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchCreateDocument() {
  yield takeLatest(CREATE_DOCUMENT, createDocumentSaga);
}
