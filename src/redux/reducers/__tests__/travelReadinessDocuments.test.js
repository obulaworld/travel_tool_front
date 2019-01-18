import travelReadinessDocuments, { initialState } from '../travelReadinessDocuments';
import {
  createTravelReadinessDocument, createTravelReadinessDocumentFailure, createTravelReadinessDocumentSuccess
} from '../../actionCreator/travelReadinessActions';
import * as types from '../../constants/actionTypes';

describe('travel readiness reducer', () => {
  it('returns initial state', () => {
    expect(travelReadinessDocuments(initialState, {})).toEqual(initialState);
  });

  it('handles create documents action appropriately', () => {
    const expectedOutput = {
      ...initialState,
      isLoading: true,
      document: {},
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT',
      response: {},
    })).toEqual(expectedOutput);
  });

  it('handles CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const expectedOutput = {
      ...initialState,
      isLoading: false,
      document: { message: 'successfully loaded' },
      errors: {}
    };
    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS',
      response: { message: 'successfully loaded' }
    })).toEqual(expectedOutput);
  });

  it('handles errors appropriately', () => {
    const error = {
      success: false,
      message: 'Validation failed',
      errors: [
        {
          message: 'country should be provided',
          name: 'visa.country',
        },
        {
          message: 'expiry date date must be provided in the form mm/dd/yyyy',
          name: 'visa.expiryDate',
        },
        {
          message: 'expiry date should be greater than date of issue',
          name: 'visa.expiryDate',
        }
      ],
    };

    const expectedOutput = {
      ...initialState,
      document: {},
      errors: {
        'country': 'country should be provided',
        'expiryDate': 'expiry date should be greater than date of issue'
      },
      isLoading: false
    };

    expect(travelReadinessDocuments(initialState, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error
    })).toEqual(expectedOutput);

    expect(travelReadinessDocuments({}, {
      type: 'CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE',
      error: {}
    })).toEqual({ 'errors': {}, 'isLoading': false });
  });

  it('should return the initial state', () => {
    expect(travelReadinessDocuments(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
      users: [{ id: 1 }]
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, users: action.users };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE', () => {
    const action = {
      type: types.FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
      error: 'Error fetching users'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS,
      userId: 1,
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
      user: { id: 1 },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, userReadiness: action.user };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_USER_READINESS_DOCUMENTS_FAILURE', () => {
    const action = {
      type: types.FETCH_USER_READINESS_DOCUMENTS_FAILURE,
      error: 'Error fetching user readiness'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT,
      documentId: 'MaLosUn',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'MaLosUn' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: false, document: action.document };

    expect(newState).toEqual(expectedState);
  });

  it('should handle FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error fetching travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, fetchingDocument: false, error: action.error };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT,
      documentId: 'JiSe',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, updatingDocument: true, document: {}, fetchingDocument: true };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'JiSe', type: 'visa' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, document: action.document, updatingDocument: false };

    expect(newState).toEqual(expectedState);
  });

  it('should handle VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error fetching travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, error: action.error, document: {}, updatingDocument: false};

    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT,
      documentType: 'visa',
      payload: {
        'visa': {
          'entryType':'Multiple',
          'country': 'Estoni and Herzegovina',
          'dateOfIssue': '02/01/2018',
          'expiryDate': '06/01/2019',
          'cloudinaryUrl': 'http://n.com'
        }
      },
      documentId: 'JiSe',
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, updatingDocument: true, document: {} };

    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
      document: { id: 'JiSe', type: 'visa' },
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, isLoading: false, document: action.document, updatingDocument: false };

    expect(newState).toEqual(expectedState);
  });

  it('should handle EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE', () => {
    const action = {
      type: types.EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
      error: 'Error updating travel readiness document'
    };

    const newState = travelReadinessDocuments(initialState, action);
    const expectedState = { ...initialState, error: action.error, document: {}, updatingDocument: false};

    expect(newState).toEqual(expectedState);
  });
});
