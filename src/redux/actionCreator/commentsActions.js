import { CREATE_COMMENT, EDIT_COMMENT } from '../constants/actionTypes';

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

export const editComment = (requestId, comment, id) => ({
  type: EDIT_COMMENT,
  requestId,
  comment,
  id
});

export const editCommentSuccess = (comment) => ({
  type: 'EDIT_COMMENT_SUCCESS',
  comment
});

export const editCommentFailure = (error) => ({
  type: 'EDIT_COMMENT_FAILURE',
  error
});
