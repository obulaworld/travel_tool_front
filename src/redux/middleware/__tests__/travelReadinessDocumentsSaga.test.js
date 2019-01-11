import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { watchFetchUsersReadinessDocuments, watchFetchReadinessDocuments, watchFetchReadinessDocumentDetails } from '../travelReadinessDocumentsSaga';
import * as types from '../../constants/actionTypes';
import TravelReadinessDocumentsAPI from '../../../services/TravelReadinessDocumentsAPI';

describe('Travel Readiness Documents saga', () => {
  describe('fetchUsersReadinessDocumentsAsync', () => {
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched users',
        users: [{id: 1}, {id: 2}],
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches all users and their readiness documents', () => {
      return expectSaga(watchFetchUsersReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getAllUsersReadiness), response]
        ])
        .put({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
          users: response.data.users
        })
        .dispatch({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchUsersReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getAllUsersReadiness), throwError(error)]
        ])
        .put({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS
        })
        .silentRun();
    });
  });

  describe('fetchReadinessDocumentsAsync', () => {
    const userId = 'xclfkgs';
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched user readiness',
        user: {id: 1},
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches a users readiness documents', () => {
      return expectSaga(watchFetchReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getUserReadiness, userId), response]
        ])
        .put({
          type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
          user: response.data.user
        })
        .dispatch({
          type: types.FETCH_USER_READINESS_DOCUMENTS,
          userId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchReadinessDocuments)
        .provide([
          [call(TravelReadinessDocumentsAPI.getUserReadiness, userId), throwError(error)]
        ])
        .put({
          type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_USER_READINESS_DOCUMENTS,
          userId,
        })
        .silentRun();
    });
  });

  describe('fetchReadinessDocumentDetailsAsync', () => {
    const documentId = 'ableGod';
    const response = {
      data: {
        success: true,
        message: 'Successfully fetched document',
        document: {id: 'ableGod'},
      }
    };

    const error = new Error('Server error, try again');
    error.response = { status: 500 };

    it('fetches a travel readiness document', () => {
      return expectSaga(watchFetchReadinessDocumentDetails)
        .provide([
          [call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, documentId), response]
        ])
        .put({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
          document: response.data.document
        })
        .dispatch({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });

    it('handles errors from fetching', () => {
      return expectSaga(watchFetchReadinessDocumentDetails)
        .provide([
          [call(TravelReadinessDocumentsAPI.getTravelReadinessDocument, documentId), throwError(error)]
        ])
        .put({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
          error: error.message
        })
        .dispatch({
          type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
          documentId,
        })
        .silentRun();
    });
  });
});
