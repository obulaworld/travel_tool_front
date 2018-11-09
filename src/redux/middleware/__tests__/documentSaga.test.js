
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';
import toast from 'toastr';
import DocumentAPI from '../../../services/DocumentAPI';
import { watchFetchDocuments, watchUpdateDocument, watchCreateDocument } from '../DocumentSaga';
import {
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT, 
  CREATE_DOCUMENT_SUCCESS, 
  CREATE_DOCUMENT_FAILURE
} from '../../constants/actionTypes';
import { documentData, response } from '../../__mocks__/documentMockData';

describe('Document saga', () => {
  describe('Fetch document saga', () => {
    const response = {
      data: {
        success: true,
        message:'Successfully fetched your documents',
        documents: [{ document: 'user documents' }]
      }
    };

    const error = {
      response: {
        status: 404,
        data: {
          success: false,
          message: 'No documents found',
        }
      }
    };

    it('fetches user documents successfully', () => {
      return expectSaga(watchFetchDocuments)
        .provide([
          [call(DocumentAPI.fetchDocuments), response]
        ])
        .put({
          type: 'FETCH_DOCUMENTS_SUCCESS',
          documents: [{ document: 'user documents' }]
        })
        .dispatch({
          type: 'FETCH_DOCUMENTS',
        })
        .run();
    });

    it('throws an error while fetchiing documents', () => {
      return expectSaga(watchFetchDocuments)
        .provide([
          [call(DocumentAPI.fetchDocuments), throwError(error)]
        ])
        .put({
          type: 'FETCH_DOCUMENTS_FAILURE',
          error: 'No documents found'
        })
        .dispatch({
          type: 'FETCH_DOCUMENTS',
        })
        .run();
    });
  });

  describe('Update document saga', () => {
    toast.success = jest.fn();
    toast.error = jest.fn();
    const newDocumentName = { id: '1', name: 'travel stipends' };
    const response = {
      data: {
        success: true,
        message: 'Document name updated successfully!',
        document: 'user document'
      }
    };

    it('Updates documents name successfully', () => {
      const { id, name } = newDocumentName;
      return expectSaga(watchUpdateDocument)
        .provide([[
          matchers.call.fn(DocumentAPI.updateDocument, id, { name }),
          response
        ]])
        .put({
          type: UPDATE_DOCUMENT_SUCCESS,
          message: response.data.message,
          document: response.data.document
        })
        .dispatch({
          type: UPDATE_DOCUMENT,
          document: newDocumentName
        })
        .run();
    });

    it('throws an error when updating documents fails', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };
      const { id, name } = newDocumentName;
      return expectSaga(watchUpdateDocument)
        .provide([[
          matchers.call.fn(DocumentAPI.updateDocument, id, { name }),
          throwError(error)
        ]])
        .put({
          type: UPDATE_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: UPDATE_DOCUMENT,
          document: newDocumentName
        })
        .run();
    });
  });

  describe('Create Documents Saga test', () => {
    it('creates a document successfully', () => {
      return expectSaga(watchCreateDocument, DocumentAPI)
        .provide([[
          call(DocumentAPI.postDocument, documentData), 
          { data: response }
        ]])
        .put({
          type: CREATE_DOCUMENT_SUCCESS,
          documentItem: response
        })
        .dispatch({
          type: CREATE_DOCUMENT,
          documentData
        })
        .run();
    });

    it('handles failed document creation', () => {
      const error = {
        response: {
          status: 422,
          data: {
            errors: ['Document saga error']
          }
        }
      };
    
      return expectSaga(watchCreateDocument, DocumentAPI)
        .provide([[
          call(DocumentAPI.postDocument, documentData),
          throwError(error)
        ]])
        .put({
          type: CREATE_DOCUMENT_FAILURE,
          error: 'Bad request. '
        })
        .dispatch({
          type: CREATE_DOCUMENT,
          documentData
        })
        .run();
    });
  });
});
