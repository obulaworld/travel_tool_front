import documents from '../documents';

describe('Comments Reducer', () => {
  let initialState = {
    isLoading: false,
    document: '',
    documents: [],
    error: ''
  };

  let action, newState, expectedState, error, mockComments;

  it('should return initial state', () => {
    expect(documents(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_DOCUMENTS', () => {
    action = {
      type: 'FETCH_DOCUMENTS',
    };

    newState = documents(initialState, action);
    expectedState = {
      isLoading: true,
      document: '',
      documents: [],
      error: ''
    };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_DOCUMENTS_SUCCESS', () => {
    action = {
      type: 'FETCH_DOCUMENTS_SUCCESS',
      documents: ['user documents']
    };

    newState = documents(initialState, action);
    expectedState = {
      isLoading: false,
      document: '',
      documents: ['user documents'],
      error: ''
    };
    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_DOCUMENTS_FAILURE', () => {
    error = 'failed to fetch documents';
    action = {
      type: 'FETCH_DOCUMENTS_FAILURE',
      error
    };

    newState = documents(initialState, action);
    expectedState = {
      isLoading: false,
      document: '',
      documents: [],
      error: 'failed to fetch documents'
    };
    expect(newState).toMatchObject(expectedState);
  });
});
