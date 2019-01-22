import {
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  FETCH_ALL_EMAIL_TEMPLATES_FAILURE
} from '../constants/actionTypes';

const initialState = {
  templates: [],
  errors:{},
  pagination: {},
  isLoading: false,
};

const reminderSetupReducer = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_EMAIL_TEMPLATES:
    return {
      ...state,
      isLoading: true
    };
  case FETCH_ALL_EMAIL_TEMPLATES_SUCCESS:
    return {
      ...state,
      templates:action.templates,
      pagination:action.pagination,
      isLoading: false
    };
  case FETCH_ALL_EMAIL_TEMPLATES_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    };
  default:
    return state;
  }
};

export default reminderSetupReducer;
