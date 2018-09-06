const initialState = {
  creatingComment: false,
  comment: '',
  comments: [],
  error: ''
};
  
const comments = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_COMMENT':
    return {
      ...state,
      creatingComment: true,
      comment: action.comment,
    };
  case 'CREATE_COMMENT_SUCCESS':
    return {
      ...state,
      creatingComment: false,
      comment: action.comment,
      comments: [action.comment, ...state.comments],
      error: ''
    };
  case 'CREATE_COMMENT_FAILURE':
    return {
      ...state,
      creatingComment: false,
      error: action.error,
    };
  default: return state;
  }
};

export default comments;
