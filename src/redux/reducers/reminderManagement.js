import {
  CREATE_REMINDER_EMAIL_TEMPLATE,
  CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE,
  CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  newEmailTemplate: {
    isSaving: false,
    errors: {},
    data: {}
  }
};

export default (state = initialState, action) => {
  switch(action.type){
  case CREATE_REMINDER_EMAIL_TEMPLATE:
    return {...state, newEmailTemplate: {
      isSaving: true,
      errors: {},
    }};
  case CREATE_REMINDER_EMAIL_TEMPLATE_SUCCESS:
    return {...state, newEmailTemplate: {
      isSaving: false,
      errors: {},
      data: action.response.reminderEmailTemplate}
    };
  case CREATE_REMINDER_EMAIL_TEMPLATE_FAILURE:
    return {...state, newEmailTemplate: {
      isSaving: false,
      errors: action.errors || {},
    }};
  default:
    return state;
  }
};
