import {
  ENABLE_REMINDER_EMAIL_TEMPLATE,
  ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE
} from '../constants/actionTypes';
  
const initialState = {
  templates: [],
  errors:{},
  pagination: {},
  isLoading: false,
};
  
const enableReminderEmailTemplateReducer = (state=initialState, action) => {
  switch (action.type) {

  case ENABLE_REMINDER_EMAIL_TEMPLATE:
    return {
      ...state,
      isLoading: true
    };
  case ENABLE_REMINDER_EMAIL_TEMPLATE_FAILURE:
    return {
      ...state,
      isLoading: false,
      errors: action.errors
    };
  default:
    return state;
  }
};
  
export default enableReminderEmailTemplateReducer;
  
