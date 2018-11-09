import {
  fetchDocuments,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
} from '../documentActions';

describe('Documents Actions', () => {
  it('should return action of type FETCH_DOCUMENTS', () => {
    const expectedAction = {
      type: 'FETCH_DOCUMENTS',
    };
    const newAction = fetchDocuments();
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type FETCH_DOCUMENTS_SUCCESS', () => {
    const data = {
      success: true,
      message:'Successfully fetched your documents',
      documents: [{ document: 'user documents' }]
    };
    const expectedAction = {
      type: 'FETCH_DOCUMENTS_SUCCESS',
      documents: [{ document: 'user documents' }]
    };
    const newAction = fetchDocumentsSuccess(data);
    expect(newAction).toEqual(expectedAction);
  });

  it('should return action of type FETCH_DOCUMENTS_FAILURE', () => {
    const errorMessage = 'No documents found';
    const expectedAction = {
      type: 'FETCH_DOCUMENTS_FAILURE',
      error: 'No documents found'
    };
    const newAction = fetchDocumentsFailure('No documents found');
    expect(newAction).toEqual(expectedAction);
  });
});
