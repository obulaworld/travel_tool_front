import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';

import { CREATE_COMMENT } from '../constants/actionTypes';
import CommentsAPI from '../../services/CommentsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  createCommentSuccess,
  createCommentFailure
} from '../actionCreator/commentsActions';
import { fetchUserRequestDetails } from '../actionCreator/requestActions';

export function* createCommentAsync(action) {
  try {
    const { requestId, comment } = action;
    const response = yield call(CommentsAPI.createComment, {requestId, comment});
    yield put(createCommentSuccess(response.data));
    yield put(fetchUserRequestDetails(requestId));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createCommentFailure(errorMessage));
  }
}

export function* watchCreateComment() {
  yield takeLatest(CREATE_COMMENT, createCommentAsync);
}
