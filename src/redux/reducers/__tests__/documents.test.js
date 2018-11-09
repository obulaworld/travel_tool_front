import documentsReducer, { initialState } from '../documents';
import {
  editDocument,
  updateDocumentOnEdit,
  removeDocumentFromEdit,
  updateDocument,
  updateDocumentFailure,
  updateDocumentSuccess
} from '../../actionCreator/documentActions';
import documentsMockData from '../../../mockData/documentsMockData';

describe('Documents reducder', () => {
  describe('Update Document', () => {
    it('should return default state for unknown action type', (done) => {
      const newState= documentsReducer(initialState, { type: 'UNKNOWN' });
      expect(newState).toMatchObject(initialState);
      done();
    });

    it('should set document for edit', (done) => {
      const action = editDocument(documentsMockData[0]);
      const newState = documentsReducer(initialState, action);

      expect(newState.documentOnEdit).toMatchObject(documentsMockData[0]);
      done();
    });

    it('should update document on edit', (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0],
        message: 'document updated successfully!',
        updatingDocument: true
      };
      const action = updateDocumentOnEdit('Travel Stipend');
      const newState = documentsReducer(currentState, action);

      expect(newState.documentOnEdit.name).toEqual('Travel Stipend');
      done();
    });

    it('should remove document from edit', (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0],
      };
      const action = removeDocumentFromEdit();
      const newState = documentsReducer(currentState, action);

      expect(newState.documentOnEdit).toBe(null);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('');
      expect(newState.message).toEqual('');
      done();
    });

    it(`should update 'updatingDocument' state to true
    while sending a 'update' document server request`,
    (done) => {
      const currentState = {
        ...initialState,
        documentOnEdit: documentsMockData[0]
      };
      const action = updateDocument({ id: '1', name: 'Travel Stipend' });
      const newState = documentsReducer(currentState, action);

      expect(newState.updatingDocument).toBe(true);
      done();
    });

    it('should update document on success', (done) => {
      const currentState = {
        ...initialState,
        documents: documentsMockData,
        documentOnEdit: documentsMockData[0]
      };
      const response = {
        data: {
          success: true,
          message: 'Document updated successfully!',
          document: {...documentsMockData[0], name: 'Travel Stipend'}
        }};
      const action = updateDocumentSuccess(response.data);
      const newState = documentsReducer(currentState, action);

      expect(newState.documents[0].name).toEqual('Travel Stipend');
      expect(newState.documentOnEdit).toBe(null);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('');
      expect(newState.message).toEqual(response.data.message);
      done();
    });

    it('should update error state on update failure', (done) => {
      const currentState = {
        ...initialState,
        documents: documentsMockData,
        documentOnEdit: documentsMockData[0]
      };
      const error = 'Server Error';
      const action = updateDocumentFailure(error);
      const newState = documentsReducer(currentState, action);
  
      expect(newState.documentOnEdit).toMatchObject(documentsMockData[0]);
      expect(newState.updatingDocument).toBe(false);
      expect(newState.error).toEqual('Server Error');
      expect(newState.message).toEqual('');
      done();
    });
  });

  describe('Fetch Reducer', () => {

    let action, newState, expectedState, error;

    it('should return initial state', () => {
      expect(documentsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_DOCUMENTS', () => {
      action = {
        type: 'FETCH_DOCUMENTS',
      };

      newState = documentsReducer(initialState, action);
      expectedState = {
        updatingDocument: false,
        documentOnEdit: null,
        isLoading: true,
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

      newState = documentsReducer(initialState, action);
      expectedState = {
        updatingDocument: false,
        documentOnEdit: null,
        isLoading: false,
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

      newState = documentsReducer(initialState, action);
      expectedState = {
        updatingDocument: false,
        documentOnEdit: null,
        isLoading: false,
        documents: [],
        error: 'failed to fetch documents'
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
});
