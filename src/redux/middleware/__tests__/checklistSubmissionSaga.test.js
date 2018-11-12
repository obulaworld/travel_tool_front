import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchPostSubmission, watchFetchSubmission } from '../checklistSubmissionSaga';
import SubmissionAPI from '../../../services/checklistSubmissionAPI';
import beds from '../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const response = {
  data: {
    success: true,
    message: 'Successfully submitted',
    submission: 'this'
  }
};

const fetchResponse = {
  data: {
    success: true,
    message: 'Successfully retrieved',
    submissions: ['this', 'that', 'then']
  }
};
const error = 'Possible network error, please reload the page';
const data = {
  action: {
    checklistId: 'HHEN7',
    formData: 'stuff'
  }
};

describe('Submission post saga ', () => {
  it('posts submission', () => {
    return expectSaga(watchPostSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.postSubmission, data), response]
      ]).put({
        type: 'POST_SUBMISSION_SUCCESS',
        submission: response.data.submission,
        message: response.data.message,
        success: response.data.success
      }).dispatch({
        type: 'POST_SUBMISSION',
        action: data.action
      }).run();
  });

  it('fails to post submission', () => {
    return expectSaga(watchPostSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.postSubmission, data),  throwError(error)]
      ]).put({
        type: 'POST_SUBMISSION_FAILURE',
        error
      }).dispatch({
        type: 'POST_SUBMISSION',
        action: data.action
      }).run();
  });

  it('fetches submission', () => {
    return expectSaga(watchFetchSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.getSubmission, '122de'), fetchResponse]
      ]).put({
        type: 'FETCH_SUBMISSION_SUCCESS',
        submissions: fetchResponse.data.submissions,
        message: 'Successfully retrieved',
        success: fetchResponse.data.success
      }).dispatch({
        type: 'FETCH_SUBMISSION',
        action: data.action
      }).run();
  });

  it('fails to fetch submission', () => {
    return expectSaga(watchFetchSubmission, SubmissionAPI)
      .provide([
        [matchers.call.fn(SubmissionAPI.getSubmission, '3334'),  throwError(error)]
      ]).put({
        type: 'FETCH_SUBMISSION_FAILURE',
        error
      }).dispatch({
        type: 'FETCH_SUBMISSION',
        action: data.action
      }).run();
  });
});
