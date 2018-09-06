import {
  createComment,
  createCommentSuccess,
  createCommentFailure
} from '../commentsActions';

describe('Comments Actions', () => {
  it('should return action of type CREATE_COMMENT', () => {
    const expectedAction = {
      type: 'CREATE_COMMENT',
      requestId: 'zkjxiow824n',
      comment: 'test comment' 
    };
    const newAction = createComment('zkjxiow824n', 'test comment');
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type CREATE_COMMENT_SUCCESS', () => {
    const expectedAction = {
      type: 'CREATE_COMMENT_SUCCESS',
      comment: 'test comment'
    };
    const newAction = createCommentSuccess('test comment');
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type CREATE_COMMENT_FAILURE', () => {
    const expectedAction = {
      type: 'CREATE_COMMENT_FAILURE',
      error: 'comment error'
    };
    const newAction = createCommentFailure('comment error');
    expect(newAction).toEqual(expectedAction);
  });
});
