import {
  CREATE_TRAVEL_READINESS_DOCUMENT,
  CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS,
  FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE,
  FETCH_USER_READINESS_DOCUMENTS,
  FETCH_USER_READINESS_DOCUMENTS_SUCCESS,
  FETCH_USER_READINESS_DOCUMENTS_FAILURE,
  FETCH_TRAVEL_READINESS_DOCUMENT,
  FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE,
} from '../constants/actionTypes';

export const initialState = {
  users: [],
  isLoading: false,
  errors: {},
  document: {},
  userReadiness: {
    fullName: '',
    travelDocuments: {
      passport: [],
      visa: [],
    },
  },
  error: '',
  fetchingDocument: false,
};


export default (state=initialState, action) => {
  switch (action.type) {
  case CREATE_TRAVEL_READINESS_DOCUMENT:
    return {...state, isLoading: true};
  case CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {...state, isLoading: false, document: action.response};
  case CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE: {
    const {error: {errors}} = action;
    const validationErrors = {};
    errors && errors.forEach( error => {
      const key = error.name.split('.');
      if( key && key.length === 2)
        validationErrors[key[1]] = error.message;
    });
    return {...state, isLoading: false, errors: validationErrors === {} ? errors : validationErrors};
  }
  case FETCH_ALL_USERS_READINESS_DOCUMENTS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_ALL_USERS_READINESS_DOCUMENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      users: action.users
    };
  case FETCH_ALL_USERS_READINESS_DOCUMENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case FETCH_USER_READINESS_DOCUMENTS:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_USER_READINESS_DOCUMENTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      userReadiness: action.user,
    };
  case FETCH_USER_READINESS_DOCUMENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      fetchingDocument: true,
      document: {}
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      fetchingDocument: false,
      document: action.document
    };
  case FETCH_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      fetchingDocument: false,
      document: {},
      error: action.error
    };
  default:
    return state;
  }
};
