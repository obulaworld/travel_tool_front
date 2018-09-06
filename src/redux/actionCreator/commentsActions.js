import { CREATE_COMMENT } from '../constants/actionTypes';

export const createComment = (requestId, comment) => ({
  type: CREATE_COMMENT,
  requestId,
  comment
});

export const createCommentSuccess = (comment) => ({
  type: 'CREATE_COMMENT_SUCCESS',
  comment
});

export const createCommentFailure = (error) => ({
  type: 'CREATE_COMMENT_FAILURE',
  error
});
