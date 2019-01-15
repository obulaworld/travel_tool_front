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
  VERIFY_TRAVEL_READINESS_DOCUMENT,
  VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE,
  EDIT_TRAVEL_READINESS_DOCUMENT,
  EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE,
  DELETE_TRAVEL_READINESS_DOCUMENT,
  DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS,
  DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_COMMENT_SUCCESS
} from '../constants/actionTypes';

export const initialState = {
  users: [],
  isLoading: false,
  error: '',
  userReadiness: {
    fullName: '',
    travelDocuments: {
      passport: [],
      visa: [],
    },
  },
  errors: {},
  document: {
    comments: [],
  },
  comments: [],
  fetchingDocument: false,
};

const tdReducer = (state = initialState.userReadiness.travelDocuments, action) => {
  switch(action.type) {
  case VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS:
  case EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      [action.document.type]: state[action.document.type].map((item) => {
        if (item.id === action.document.id) {
          return action.document;
        }
        return item;
      })
    };
  default: return state;
  }
};

const delReducer = (state = initialState.userReadiness.travelDocuments, action) => {
  switch (action.type) {
  case DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      [action.deletedDocument.type]: state[action.deletedDocument.type].filter((item) => {
        return item.id !== action.deletedDocument.id;
      })
    };
  default: return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
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
      document: {
        comments: [],
      },
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
      document: {
        comments: [],
      },
      error: action.error
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      fetchingDocument: true,
      updatingDocument: true,
      document: {
        comments: [],
      },
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT_SUCCESS:
  case EDIT_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      fetchingDocument: false,
      updatingDocument: false,
      document: action.document,
      userReadiness: {
        ...state.userReadiness,
        travelDocuments: tdReducer(state.userReadiness.travelDocuments, action)
      }
    };
  case VERIFY_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      fetchingDocument: false,
      updatingDocument: false,
      error: action.error,
      document: {
        comments: [],
      },
    };
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
  case EDIT_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      updatingDocument: true,
      document: {},
    };
  case EDIT_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      updatingDocument: false,
      error: action.error,
      document: {},
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT:
    return {
      ...state,
      deletingDocument: true,
      document: {},
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT_SUCCESS:
    return {
      ...state,
      deletingDocument: false,
      document: action.deletedDocument,
      userReadiness: {
        ...state.userReadiness,
        travelDocuments: delReducer(state.userReadiness.travelDocuments, action)
      }
    };
  case DELETE_TRAVEL_READINESS_DOCUMENT_FAILURE:
    return {
      ...state,
      deletingDocument: false,
      error: action.error,
      document: {},
    };
  case CREATE_COMMENT_SUCCESS:
    return {
      ...state,
      document: {
        ...state.document,
        comments: [
          ...state.document.comments,
          action.comment.comment
        ],
      },
      comments: [
        ...state.document.comments,
        action.comment.comment
      ],
    };
  default: return state;
  }
};
