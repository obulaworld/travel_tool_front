const initialState = {
  isLoading: false,
  document: '',
  documents: [],
  error: ''
};

const documents = (state = initialState, action) => {
  switch(action.type) {
  case 'FETCH_DOCUMENTS':
    return { ...state, isLoading: true};
  case 'FETCH_DOCUMENTS_SUCCESS':
    return { ...state, isLoading: false, documents: action.documents, error: '' };
  case 'FETCH_DOCUMENTS_FAILURE':
    return { ...state, isLoading: false, error: action.error };
  default: return state;
  }
};

export default documents;
