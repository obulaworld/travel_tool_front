import {
  CREATE_TRAVEL_READINESS_DOCUMENT,
  CREATE_TRAVEL_READINESS_DOCUMENT_FAILURE,
  CREATE_TRAVEL_READINESS_DOCUMENT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  document: {},
  errors: {}
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
  default:
    return state;
  }
};
