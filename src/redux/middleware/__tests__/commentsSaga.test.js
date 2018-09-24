import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import CommentsAPI from '../../../services/CommentsAPI';
import { watchCreateComment, watchEditComment } from '../commentsSaga';

const error = 'Possible network error, please reload the page';
describe('Comments saga', () => {
  describe('Create comment saga', () => {
    const commentData = {
      requestId: 'abcdefgh',
      comment: 'Saga test comment'
    };

    const response = {
      data: { comment: 'Saga test comment'}
    };

    const error = {
      response: {
        status: 422,
        data: {
          errors: ['Comment saga error']
        }
      }
    };

    it('creates a new comment successfully', () => {
      return expectSaga(watchCreateComment)
        .provide([
          [call(CommentsAPI.createComment, commentData), response]
        ])
        .put({
          type: 'CREATE_COMMENT_SUCCESS',
          comment: { comment : 'Saga test comment' }
        })
        .dispatch({
          type: 'CREATE_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment
        })
        .run();
    });

    it('throws an error while creating a comment', () => {
      return expectSaga(watchCreateComment)
        .provide([
          [call(CommentsAPI.createComment, commentData), throwError(error)]
        ])
        .put({
          type: 'CREATE_COMMENT_FAILURE',
          error: 'Bad request. '
        })
        .dispatch({
          type: 'CREATE_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment
        })
        .run();
    });
  });


  describe('Edit comment saga', () => {
    const commentData = {
      requestId: 'abcdefgh',
      comment: 'Saga test comment',
    };
    const id = 'F5hDV2lK';

    it('Updates comment successfully', () => {
      return expectSaga(watchEditComment)
        .provide([
          [call(CommentsAPI.editComment, id), commentData]
        ])
        .dispatch({
          type: 'EDIT_COMMENT',
          response: commentData,
          id
        })
        .run();
    });

    it('throws an error while updating a comment', () => {
      return expectSaga(watchEditComment)
        .provide([
          [call(CommentsAPI.editComment, id), throwError(error)]
        ])
        .put({
          type: 'EDIT_COMMENT_FAILURE',
          error
        })
        .dispatch({
          type: 'EDIT_COMMENT',
          requestId: commentData.requestId,
          comment: commentData.comment
        })
        .run();
    });
  });
});
