/* eslint-disable import/prefer-default-export */
import * as types from '../constants/actionTypes';

export const fetchAllUsersReadinessDocuments = () => ({
  type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS,
});

export const fetchAllUsersReadinessDocumentsSuccess = (users) => ({
  type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
  users,
});

export const fetchAllUsersReadinessDocumentsFailure = (error) => ({
  type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
  error,
});

export const fetchUserReadinessDocuments = (userId) => ({
  type: types.FETCH_USER_READINESS_DOCUMENTS,
  userId,
});

export const fetchUserReadinessDocumentsSuccess = (user) => ({
  type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
  user,
});

export const fetchUserReadinessDocumentsFailure = (error) => ({
  type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
  error,
});

export const fetchTravelReadinessDocument = (documentId) => ({
  type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
  documentId,
});

export const fetchTravelReadinessDocumentSuccess = (document) => ({
  type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  document,
});

export const fetchTravelReadinessDocumentFailure = (error) => ({
  type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
  error,
});

export const verifyTravelReadinessDocument = (documentId) => ({
  type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
  documentId,
});

export const verifyTravelReadinessDocumentSuccess = (document) => ({
  type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  document
});

export const verifyTravelReadinessDocumentFailure = (error) => ({
  type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
  error
});

export const editTravelReadinessDocument = (documentType, payload, documentId) => ({
  type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
  documentType,
  payload,
  documentId
});

export const editTravelReadinessDocumentSuccess = (documentUpdate) => ({
  type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  documentUpdate
});

export const editTravelReadinessDocumentFailure = (error) => ({
  type: types.EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
  error
});

export const deleteTravelReadinessDocument = (documentId) => ({
  type: types.DELETE_TRAVEL_READINESS_DOCUMENT,
  documentId
});

export const deleteTravelReadinessDocumentSuccess = (deletedDocument) => ({
  type: types.DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  deletedDocument
});

export const deleteTravelReadinessDocumentFailure = (error) => ({
  type: types.DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  error
});
