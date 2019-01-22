import {
  DISABLE_REMINDER_CONDITION,
  DISABLE_REMINDER_CONDITION_SUCCESS,
  DISABLE_REMINDER_CONDITION_FAILURE,
  FETCH_EMAIL_REMINDERS,
  FETCH_EMAIL_REMINDERS_SUCCESS,
  FETCH_EMAIL_REMINDERS_FAILURE
} from '../constants/actionTypes';

export const initialState = {
  isLoading: false,
  reminders: [],
  error: {},
  meta: {documentCount: {}},
  disabling: false
};

let remindersUpdate;

const emailReminders = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_EMAIL_REMINDERS:
    return {...state, isLoading: true};
  case FETCH_EMAIL_REMINDERS_SUCCESS:
    return {...state, isLoading: false, ...action.payload};
  case FETCH_EMAIL_REMINDERS_FAILURE:
    return { ...state, isLoading: false, error: action.error};
  case DISABLE_REMINDER_CONDITION:
    return {...state, disabling: true};
  case DISABLE_REMINDER_CONDITION_SUCCESS:
    remindersUpdate = state.reminders.map((list) => {
      if (list.id === action.condition.id) {
        return action.condition;
      }
      return list;
    });
    return {
      ...state,
      disabling: false,
      reminders: [...remindersUpdate]
    };
  case DISABLE_REMINDER_CONDITION_FAILURE:
    return { ...state, disabling: false, error: action.error};
  default:
    return state;
  }
};

export default emailReminders;
