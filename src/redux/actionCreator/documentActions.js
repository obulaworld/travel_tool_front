import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT_FROM_EDIT,
  UPDATE_DOCUMENT_ON_EDIT,
  UPDATE_DOCUMENT,
  UPDATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT, 
  CREATE_DOCUMENT_SUCCESS, 
  CREATE_DOCUMENT_FAILURE
} from '../constants/actionTypes';


export const fetchDocuments = () => ({
  type: FETCH_DOCUMENTS,
});

export const fetchDocumentsSuccess = (data) => ({
  type: FETCH_DOCUMENTS_SUCCESS,
  documents: data.documents,
});

export const fetchDocumentsFailure = (error) => ({
  type: FETCH_DOCUMENTS_FAILURE,
  error,
});

export const editDocument = document => ({
  type: EDIT_DOCUMENT,
  document
});

export const removeDocumentFromEdit = () => ({
  type: REMOVE_DOCUMENT_FROM_EDIT
});

export const updateDocumentOnEdit = documentName => ({
  type: UPDATE_DOCUMENT_ON_EDIT,
  documentName
});

export const updateDocument = document => ({
  type: UPDATE_DOCUMENT,
  document
});

export const updateDocumentFailure = error => ({
  type: UPDATE_DOCUMENT_FAILURE,
  error
});

export const updateDocumentSuccess = ({ message, document}) => ({
  type: UPDATE_DOCUMENT_SUCCESS,
  message,
  document
});

export const createDocument = (documentData) => ({
  type: CREATE_DOCUMENT,
  documentData,
});

export const createDocumentSuccessfully = (documentItem) => ({
  type: CREATE_DOCUMENT_SUCCESS,
  documentItem,
});

export const createDocumentFailure = (error) => ({
  type: CREATE_DOCUMENT_FAILURE,
  error,
});
