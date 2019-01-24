import * as types from '../constants/actionTypes';

export const initialState = {
  templates: [],
  currentPage: 0,
  isLoading: false,
  newReminder: {
    isCreating: false,
    errors: {},
    data: {},
  },
};

const templateReducer = (templates = [], action) => {
  const leastTemplateId = templates.length
    ? templates[templates.length - 1].id : action.pagination.totalCount + 1;
  const newTemplates = action.templates.filter(template => template.id < leastTemplateId);
  return [...templates, ...newTemplates];
};

const newReminderReducer = (reminderState = initialState.newReminder, action) => {
  switch (action.type) {
  case types.CREATE_REMINDER: {
    return {
      ...reminderState,
      isCreating: true,
      errors: {}
    };
  }
  case types.CREATE_REMINDER_SUCCESS: {
    return {
      ...reminderState,
      isCreating: false,
      data: action.reminder,
      errors: {}
    };
  }
  case types.CREATE_REMINDER_FAILURE: {
    return {
      ...reminderState,
      isCreating: false,
      errors: action.errors,
    };
  }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_ALL_EMAIL_TEMPLATES:
    return {
      ...state,
      isLoading: true
    };
  case types.FETCH_ALL_EMAIL_TEMPLATES_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      templates: templateReducer(state.templates, action),
      currentPage: action.pagination.currentPage,
    };
  }
  case types.CREATE_REMINDER_EMAIL_TEMPLATE: {
    return {
      ...state,
      templates: []
    };
  }
  case types.CREATE_REMINDER:
  case types.CREATE_REMINDER_FAILURE:
  case types.CREATE_REMINDER_SUCCESS: {
    return {
      ...state,
      newReminder: newReminderReducer(state.newReminder, action),
    };
  }
  default:
    return state;
  }
};
