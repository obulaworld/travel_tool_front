import {
  createComment,
  createCommentSuccess,
  createCommentFailure,
  editComment,
  editCommentSuccess,
  editCommentFailure
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

  it('should return action of type EDIT_COMMENT', () => {
    const expectedAction = {
      type: 'EDIT_COMMENT',
      requestId: 'zkjxiow824n',
      id: 'scjerow234n',
      comment: 'test edit comment' 
    };
    const newAction = editComment('zkjxiow824n', 'test edit comment', 'scjerow234n');
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type EDIT_COMMENT_SUCCESS', () => {
    const expectedAction = {
      type: 'EDIT_COMMENT_SUCCESS',
      comment: 'test edit comment'
    };
    const newAction = editCommentSuccess('test edit comment');
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type EDIT_COMMENT_FAILURE', () => {
    const expectedAction = {
      type: 'EDIT_COMMENT_FAILURE',
      error: 'edit comment error'
    };
    const newAction = editCommentFailure('edit comment error');
    expect(newAction).toEqual(expectedAction);
  });
});
