import {
  FETCH_ALL_EMAIL_TEMPLATES,
  FETCH_ALL_EMAIL_TEMPLATES_SUCCESS,
  FETCH_ALL_EMAIL_TEMPLATES_FAILURE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS,
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
  case ENABLE_REMINDER_EMAIL_TEMPLATE_SUCCESS:
    return {
      ...state,
      templates:[...state.templates].map((template) => {
        if(template && action.enabledTemplate.id === template.id){
          template.disabled = action.enabledTemplate.disabled;
        }
        return template;
      }),
      isLoading: false
    };
  default:
    return state;
  }
};

export default reminderSetupReducer;
