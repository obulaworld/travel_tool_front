import comments from '../comments';
// import 

describe('Comments Reducer', () => {
  let initialState = {
    creatingComment: false,
    editingComment: false,
    comment: '',
    comments: [],
    error: ''
  };

  let action, newState, expectedState, error;

  it('should return initial state', () => {
    expect(comments(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_COMMENT', () => {
    action = {
      type: 'CREATE_COMMENT',
      requetsId: 'zcis7csUe',
      comment: 'test comment'
    };

    newState = comments(initialState, action);
    expectedState = {
      creatingComment: true,
      editingComment: false,
      comment: 'test comment',
      comments: [],
      error: ''
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle CREATE_COMMENT_SUCCESS', () => {
    action = {
      type: 'CREATE_COMMENT_SUCCESS',
      comment: 'test comment',
      comments: []
    };

    newState = comments(initialState, action);
    expectedState = {
      creatingComment: false,
      editingComment: false,
      comment: 'test comment',
      comments: ['test comment'],
      error: ''
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle CREATE_COMMENT_FAILURE', () => {
    error = 'failed to add new request';
    action = {
      type: 'CREATE_COMMENT_FAILURE',
      error
    };

    newState = comments(initialState, action);
    expectedState = {
      creatingComment: false,
      error: 'failed to add new request'
    };
    expect(newState).toMatchObject(expectedState);
  });
});
