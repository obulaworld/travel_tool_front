import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import DocumentAPI from '../../../services/DocumentAPI';
import { watchFetchDocuments } from '../DocumentSaga';

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
});
